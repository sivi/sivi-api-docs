#!/usr/bin/env node

/**
 * Generates docs/sivi-api/common/design-types.md from docs/sivi-api/data/sizes.json
 *
 * Usage: node scripts/generate-design-types.js
 *
 * The sizes.json must be in mediumSizesJson format:
 * {
 *   "mediumName": {
 *     "status": "enable",
 *     "sizes": [
 *       { "medium": "...", "type": "...", "dimension": { "width": W, "height": H }, "name": "..." },
 *       ...
 *     ]
 *   },
 *   ...
 * }
 */

const fs = require('fs')
const path = require('path')

const SIZES_JSON_PATH = path.join(__dirname, '..', 'docs', 'sivi-api', 'data', 'sizes.json')
const OUTPUT_MD_PATH = path.join(__dirname, '..', 'docs', 'sivi-api', 'common', 'design-types.md')

// Category groupings for display organization
const CATEGORY_GROUPS = [
	{
		title: 'Social Media Designs',
		mediums: ['instagram', 'facebook', 'twitter', 'linkedin', 'pinterest', 'whatsapp', 'youtube', 'snapchat', 'reddit'],
	},
	{
		title: 'Display & Web Advertising',
		mediums: ['displayAds'],
	},
	{
		title: 'E-commerce & Website',
		mediums: ['amazon', 'website'],
	},
	{
		title: 'Email Marketing',
		mediums: ['email'],
	},
	{
		title: 'Podcast & Streaming',
		mediums: ['podcast', 'twitch'],
	},
	{
		title: 'AI Image Generation',
		mediums: ['gpt-square', 'landscape', 'potrait', 'nano-banana', 'nano-banana-2', 'nano-banana-pro'],
	},
]

// Display name overrides for mediums (used as section headers)
const MEDIUM_DISPLAY_NAMES = {
	instagram: 'Instagram',
	facebook: 'Facebook',
	twitter: 'Twitter',
	linkedin: 'LinkedIn',
	pinterest: 'Pinterest',
	whatsapp: 'WhatsApp',
	youtube: 'YouTube',
	snapchat: 'Snapchat',
	reddit: 'Reddit',
	displayAds: 'Display Ads',
	amazon: 'Amazon Ads',
	website: 'Website Elements',
	email: 'Email',
	podcast: 'Podcast',
	twitch: 'Twitch',
	'gpt-square': 'GPT Image (Square)',
	landscape: 'GPT Image (Landscape)',
	potrait: 'GPT Image (Portrait)',
	'nano-banana': 'Nano Banana',
	'nano-banana-2': 'Nano Banana 2',
	'nano-banana-pro': 'Nano Banana Pro',
	custom: 'Custom',
}

function formatDimension(dimension) {
	if (!dimension) return 'User-defined'
	const { width, height } = dimension
	if (width === undefined || height === undefined) return 'User-defined'
	return `${width} × ${height}`
}

function generateMediumTable(mediumKey, mediumData) {
	const sizes = mediumData.sizes || []
	const displayName = MEDIUM_DISPLAY_NAMES[mediumKey] || mediumKey

	const header = `| Type | Subtype | Dimensions (width × height) |\n|------|---------|--------------------------|\n`
	const rows = sizes
		.map((size) => {
			const type = size.medium || mediumKey
			const subtype = size.type || 'N/A'
			const dims = formatDimension(size.dimension)
			return `| ${type} | ${subtype} | ${dims} |`
		})
		.join('\n')

	return `### ${displayName}\n\n${header}${rows}\n`
}

function generateMarkdown(mediumSizesJson) {
	const sections = []

	// Frontmatter
	sections.push(`---
id: design-types
title: Design Types & Dimensions
description: Complete list of supported design types and their dimensions
sidebar_position: 9
---`)

	// Title and intro
	sections.push(`# Design Types & Dimensions

Sivi supports a wide variety of design types and subtypes, each tailored for specific platforms and purposes. This page provides a comprehensive reference of all available design dimensions organized by platform.`)

	// Parameters section
	sections.push(`## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | The type of design to generate |
| subtype | string | The specific format of the design |
| dimension | object | The dimensions of the design (width, height) |`)

	// Collect all mediums from JSON
	const allMediums = Object.keys(mediumSizesJson)
	const groupedMediums = new Set()
	const ungroupedMediums = []

	// Generate sections by category group
	for (const group of CATEGORY_GROUPS) {
		const groupMediums = group.mediums.filter((m) => allMediums.includes(m))
		if (groupMediums.length === 0) continue

		groupMediums.forEach((m) => groupedMediums.add(m))

		const tables = groupMediums
			.map((m) => generateMediumTable(m, mediumSizesJson[m]))
			.join('\n')

		sections.push(`## ${group.title}\n\n${tables}`)
	}

	// Find any mediums not in any group (exclude custom - has dedicated section)
	for (const m of allMediums) {
		if (!groupedMediums.has(m) && m !== 'custom') {
			ungroupedMediums.push(m)
		}
	}

	if (ungroupedMediums.length > 0) {
		const tables = ungroupedMediums
			.map((m) => generateMediumTable(m, mediumSizesJson[m]))
			.join('\n')
		sections.push(`## Other Design Types\n\n${tables}`)
	}

	// Custom dimensions note (if custom medium exists)
	if (mediumSizesJson.custom) {
		sections.push(`## Custom Dimensions

For designs that don't fit standard dimensions, you can specify custom dimensions. Both width and height must be between 150px and 2000px.

| Type | Subtype | Dimensions (width × height) |
|------|---------|--------------------------|
| custom | custom | User-defined (min: 150 × 150, max: 2000 × 2000) |`)
	}

	// Example usage
	sections.push(`## Example Usage

Here's a comprehensive example showing how to use the design types and subtypes:

\`\`\`json
{
    "type": "instagram",
    "subtype": "instagram-post",
    "dimension": {
      "width": 1080,
      "height": 1080
    }
}
\`\`\``)

	// Usage notes
	sections.push(`## Usage Notes

- When using the API, specify both the \`type\` and \`subtype\` in your request to ensure the correct dimensions
- For custom dimensions, specify the exact width and height in the \`dimension\` field. Both width and height must be between 150px and 2000px
- Some platforms may update their recommended dimensions periodically
- Ensure your content is designed to remain visible and effective within the safe areas of each format`)

	return sections.join('\n\n') + '\n'
}

function main() {
	// Read sizes.json
	const sizesRaw = fs.readFileSync(SIZES_JSON_PATH, 'utf-8')
	const mediumSizesJson = JSON.parse(sizesRaw)

	// Generate markdown
	const markdown = generateMarkdown(mediumSizesJson)

	// Write to design-types.md
	fs.writeFileSync(OUTPUT_MD_PATH, markdown, 'utf-8')

	const mediumCount = Object.keys(mediumSizesJson).length
	let totalSizes = 0
	for (const medium of Object.keys(mediumSizesJson)) {
		totalSizes += (mediumSizesJson[medium].sizes || []).length
	}

	console.log(`✅ Generated ${OUTPUT_MD_PATH}`)
	console.log(`   ${mediumCount} mediums, ${totalSizes} design types`)
}

main()
