---
id: brand-persona-details
title: Brand Persona Details
description: Complete list of supported parameters for defining brand personas
sidebar_position: 10
---

# Brand Persona Details

Sivi allows you to define detailed brand personas to generate designs that match your brand identity and target audience. This page provides a comprehensive reference of all available brand persona parameters that can be used with the API.


## Industry Options

The industry parameter helps tailor designs to specific business sectors. Each industry has unique design conventions and styles.

| ID | Display Name |
|------|-------------|
| accounting_finance | Accounting & Finance |
| advertising | Advertising |
| agriculture | Agriculture |
| architecture | Architecture |
| art_design | Art & Design |
| automotive | Automotive |
| aviation | Aviation |
| banking | Banking |
| bar_nightclub | Bar & Nightclub |
| beauty_cosmetics | Beauty & Cosmetics |
| books_literature | Books & Literature |
| business_consulting | Business & Consulting |
| childcare | Childcare |
| cleaning_maintenance | Cleaning & Maintenance |
| clothing | Clothing |
| communications | Communications |
| community_non_profit | Community & Non-profit |
| computer_electronics | Computer & Electronics |
| construction | Construction |
| dating | Dating |
| design | Design |
| drinks | Drinks |
| economics | Economics |
| education | Education |
| engineering | Engineering |
| entertainment | Entertainment |
| entrepreneurship | Entrepreneurship |
| environment | Environment |
| events | Events |
| fashion | Fashion |
| fitness_wellness | Fitness & wellness |
| floral | Floral |
| food | Food |
| footwear | Footwear |
| gambling | Gambling |
| games | Games |
| health | Health |
| hobbies_recreation | Hobbies & Recreation |
| home_garden | Home & Garden |
| industrial | Industrial |
| internet | Internet |
| law | Law |
| management | Management |
| marketing | Marketing |
| medical_pharmaceutical | Medical & Pharmaceutical |
| movies | Movies |
| music | Music |
| news | News |
| nursing | Nursing |
| pets_animals | Pets & Animals |
| photography | Photography |
| political | Political |
| real_estate | Real estate |
| real_estate_mortgage | Real Estate & Mortgage |
| religious | Religious |
| restaurant_cuisine | Restaurant & Cuisine |
| retail | Retail |
| science | Science |
| security | Security |
| shopping | Shopping |
| small_business | Small business |
| sports | Sports |
| technology | Technology |
| toys | Toys |
| travel_hotel | Travel & Hotel |
| wedding | Wedding |

## Emotions

The emotional tone helps define the feeling your design should evoke in viewers.

| ID | Emotion |
|------|-------------|
| happy | Happy |
| excited | Excited |
| surprised | Surprised |
| smart | Smart |
| love | Love |
| cool | Cool |
| curious | Curious |
| trust | Trust |
| secret | Secret |
| neutral | Neutral |
| desire | Desire |
| tired | Tired |
| angry | Angry |
| bored | Bored |
| sad | Sad |
| fear | Fear |
| crying | Crying |


<!-- ## Tones

The tone allows you to position your brand along different spectrums to further refine the design style.

| ID | Emotion |
|------|-------------|
| playful | Playful |
| professional | Professional |
| economical | Economical |
| luxurious | Luxurious |
| classic | Classic |
| modern | Modern |
| minimal | Minimal |
| maximal | Maximal | -->


## Example Usage

Here's a comprehensive example showing how to use the brand persona parameters:

```json
{
    "industry": "fashion",
    "emotions": ["happy"],
}
```

<!-- "tones": ["playful", "maximal"] -->

## Usage Notes

- When using the API, you should specify at least one industry for optimal results
- Emotions can significantly impact the color palette and visual elements used in designs
- For best results, align your target audience with your actual customer demographics
- Multiple parameters can be combined to create a highly specific brand persona