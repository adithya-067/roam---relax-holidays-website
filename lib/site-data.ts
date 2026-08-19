// Central content for Roam & Relax Holidays.
// Edit these arrays to update the site content, imagery, and contact configuration.

export type ContactConfig = {
  phone: string | null
  phoneFormatted: string
  email: string | null
  whatsapp: string | null
  address: string | null
  socials: {
    instagram: string | null
    facebook: string | null
    youtube: string | null
    twitter: string | null
  }
}

// Centralized contact & social media configuration.
// Edit these values in one place — they power the footer, WhatsApp button, and enquiry emails.
export const CONTACT_CONFIG: ContactConfig = {
  phone: '+91 9901 330 330', // Display format
  phoneFormatted: '+919901330330', // tel: link format (digits with country code, no spaces)
  email: 'hello@roamandrelaxholidays.com',
  whatsapp: '919901330330', // WhatsApp number without + or spaces
  address: 'Bengaluru, Karnataka, India',
  socials: {
    // Set to a full URL when live, or keep as a clean configurable URL
    instagram: 'https://instagram.com/roamandrelaxholidays',
    facebook: null,
    youtube: null,
    twitter: null,
  },
}

export const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Services', href: '/#experiences' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const

export type Destination = {
  name: string
  tagline: string
  image: string
}

export const DESTINATIONS: Destination[] = [
  {
    name: 'Goa',
    tagline: 'Sun-kissed beaches & vibrant coastal soul',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Kerala',
    tagline: 'Tranquil backwaters & misty tea gardens',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Kashmir',
    tagline: 'Snow-capped peaks & serene Dal Lake',
    image: 'https://images.pexels.com/photos/35672518/pexels-photo-35672518.jpeg',
  },
  {
    name: 'Rajasthan',
    tagline: 'Majestic forts & royal heritage stay',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Himachal Pradesh',
    tagline: 'Pine forests, alpine valleys & adventure',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Andaman Islands',
    tagline: 'Turquoise waters & coral beach retreats',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop',
  },
]

export type PackageItineraryItem = {
  day: number
  title: string
  description: string
}

export type PlaceToVisit = {
  name: string
  description: string
}

export type Package = {
  slug: string
  name: string
  destination: string
  duration: string
  tagline: string
  image: string
  highlights?: string[]
  placesToVisit?: PlaceToVisit[]
  overview: string
  itinerary: PackageItineraryItem[]
  inclusions: string[]
  exclusions: string[]
  gallery: string[]
}

export const PACKAGES: Package[] = [
  {
    slug: 'goa-beach-escape',
    name: 'Goa Beach Escape',
    destination: 'Goa, India',
    duration: '5 Days / 4 Nights',
    tagline: 'Sun, Sand & Coastal Tranquility',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      '5-Star Beachfront Luxury Resort Stay',
      'Sunset Mandovi Catamaran Cruise',
      'Old Goa Portuguese Heritage Excursion',
      'Organic Spice Plantation Tour & Lunch',
    ],
    placesToVisit: [
      {
        name: 'Fort Aguada & Baga Beach',
        description: 'Iconic 17th-century Portuguese fort overlooking the Arabian Sea and vibrant North Goa coastlines.',
      },
      {
        name: 'Basilica of Bom Jesus (Old Goa)',
        description: 'UNESCO World Heritage site featuring centuries-old Portuguese Baroque architecture.',
      },
      {
        name: 'Organic Spice Plantation',
        description: 'Lush tropical plantation tour showcasing Goan spices, flora, and authentic traditional buffet lunch.',
      },
      {
        name: 'Mandovi River',
        description: 'Serene river catamaran cruise featuring traditional Goan folk music, dances, and sunset panoramas.',
      },
    ],
    overview:
      'Immerse yourself in the tropical allure of Goa. Enjoy sun-drenched beaches, heritage Portuguese architecture, luxury beachfront resort accommodations, sunset cruises, and authentic Goan cuisine.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa & Beachside Welcome',
        description:
          'Arrive at Goa International Airport and take a private luxury transfer to your resort. Relax by the beach and enjoy a sunset welcome dinner.',
      },
      {
        day: 2,
        title: 'North Goa Heritage & Coastal Exploration',
        description:
          'Visit historic Fort Aguada, Chapora Fort, and iconic North Goa beaches like Baga and Anjuna. Enjoy water sports or evening seaside lounge dining.',
      },
      {
        day: 3,
        title: 'South Goa Tranquility & Spice Plantation',
        description:
          'Explore serene South Goa beaches, visit old Goan churches (Basilica of Bom Jesus), and enjoy a spice plantation tour with traditional lunch.',
      },
      {
        day: 4,
        title: 'Mandovi River Cruise & Leisure',
        description:
          'Spend the day relaxing at your resort spa or private beach cabana. In the evening, embark on a luxury catamaran cruise along the Mandovi River.',
      },
      {
        day: 5,
        title: 'Departure from Goa',
        description:
          'Enjoy a relaxed breakfast at your resort before taking your private transfer back to the airport.',
      },
    ],
    inclusions: [
      '4 Nights Luxury 5-Star Beach Resort Accommodation',
      'Daily Buffet Breakfast & Gourmet Dinners',
      'Private Airport Transfers in Executive AC Vehicle',
      'Guided North & South Goa Sightseeing Excursions',
      'Sunset Mandovi Catamaran Cruise with Live Cultural Show',
      'Organic Spice Plantation Tour with Traditional Lunch',
    ],
    exclusions: [
      'Airfare or Train Tickets',
      'Personal Expenses & Laundry',
      'Optional Water Sports & Scuba Diving Activities',
      'Travel Insurance',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    slug: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    destination: 'Kerala, India',
    duration: '6 Days / 5 Nights',
    tagline: 'Serene Houseboats & Lush Greens',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Private Deluxe Houseboat Cruise in Alleppey',
      'Munnar Misty Tea Garden Excursions',
      'Periyar Wildlife & Spice Plantation Tour',
      'Fort Kochi Heritage & Kathakali Performance',
    ],
    placesToVisit: [
      {
        name: 'Alleppey Backwaters',
        description: 'World-famous emerald palm-fringed backwaters explored via private luxury air-conditioned houseboat.',
      },
      {
        name: 'Munnar Tea Estates',
        description: 'Rolling green tea plantations, Tea Museum, and misty mountain views in Munnar hill station.',
      },
      {
        name: 'Periyar Sanctuary (Thekkady)',
        description: 'Lush spice gardens and wildlife boat safari along Periyar Lake.',
      },
      {
        name: 'Fort Kochi Heritage Coast',
        description: 'Historic colonial seaside district featuring iconic Chinese fishing nets and Kathakali art.',
      },
    ],
    overview:
      "Journey through 'God's Own Country' with an unforgettable itinerary covering Munnar's rolling tea estates, Thekkady's wildlife sanctuaries, and Alleppey's world-famous luxury backwater houseboats.",
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi & Scenic Drive to Munnar',
        description:
          'Arrive in Kochi and take a scenic mountain drive to Munnar, passing Cheeyappara and Valara waterfalls. Check into your luxury hill resort.',
      },
      {
        day: 2,
        title: 'Munnar Tea Plantations & Eravikulam',
        description:
          'Visit Mattupetty Dam, Kundala Lake, Tea Museum, and Eravikulam National Park, home to the endangered Nilgiri Tahr.',
      },
      {
        day: 3,
        title: 'Spice Sanctuary of Thekkady',
        description:
          'Drive to Thekkady. Enjoy a guided spice garden tour and an afternoon bamboo rafting or boat ride on Periyar Lake.',
      },
      {
        day: 4,
        title: 'Alleppey Luxury Houseboat Cruise',
        description:
          'Board your private air-conditioned houseboat in Alleppey. Cruise serene palm-fringed backwaters while enjoying freshly prepared Keralite meals.',
      },
      {
        day: 5,
        title: 'Kochi Heritage & Kathakali Night',
        description:
          'Return to Kochi. Tour Fort Kochi, Chinese Fishing Nets, St. Francis Church, and attend a traditional Kathakali dance performance.',
      },
      {
        day: 6,
        title: 'Departure from Kochi',
        description:
          'Enjoy breakfast and spend your morning souvenir shopping in Kochi before your airport drop-off.',
      },
    ],
    inclusions: [
      '3 Nights Luxury Resort Stay in Munnar & Thekkady',
      '1 Night Deluxe Private Houseboat with Full Board Meals',
      '1 Night Heritage Hotel Stay in Fort Kochi',
      'Daily Breakfast & Dinner at Resorts',
      'Private AC Vehicle for all Transfers & Sightseeing',
      'Traditional Kathakali Dance Performance Tickets',
    ],
    exclusions: [
      'Airfare or Railway Fares',
      'Camera Fees & Entry Tickets at Monuments',
      'Personal Ayurvedic Spa Treatments',
      'Travel Insurance',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609828913642-a0e28d54c125?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    slug: 'kashmir-paradise',
    name: 'Kashmir Paradise',
    destination: 'Kashmir, India',
    duration: '6 Days / 5 Nights',
    tagline: 'Heaven on Earth & Alpine Valleys',
    image: 'https://images.pexels.com/photos/35672518/pexels-photo-35672518.jpeg',
    highlights: [
      'Luxury Wooden Houseboat Stay on Dal Lake',
      'Sunset Shikara Cruise across Dal Lake',
      'Gulmarg Gondola Ride to Apharwat Peak',
      'Pahalgam Saffron Fields & Betaab Valley',
    ],
    placesToVisit: [
      {
        name: 'Dal Lake (Srinagar)',
        description: 'Tranquil alpine lake famous for carved luxury houseboats, floating markets, and romantic Shikara rides.',
      },
      {
        name: 'Gulmarg Gondola Peak',
        description: 'World’s second-highest cable car taking you to Apharwat Peak for snow panoramas and alpine trails.',
      },
      {
        name: 'Pahalgam & Betaab Valley',
        description: 'Valley of Shepherds surrounded by pine forests, pristine Lidder River, and lush meadows.',
      },
      {
        name: 'Mughal Gardens (Srinagar)',
        description: 'Historic terraced gardens (Nishat & Shalimar Bagh) built by Mughal emperors with mountain backdrops.',
      },
    ],
    overview:
      'Experience the spellbinding beauty of Kashmir. Ride iconic Shikaras on Dal Lake, stay in luxury wooden houseboats, witness Gulmarg snow peaks, and explore Pahalgam pine valleys.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Shikara Ride',
        description:
          'Arrive at Srinagar Airport. Check into your luxury wooden houseboat on Dal Lake and enjoy an evening sunset Shikara ride.',
      },
      {
        day: 2,
        title: 'Mughal Gardens & Srinagar Heritage',
        description:
          'Explore Nishat Bagh, Shalimar Bagh, Chashme Shahi, and the historic Shankaracharya Temple overlooking the valley.',
      },
      {
        day: 3,
        title: 'Gulmarg Gondola & Alpine Meadows',
        description:
          'Full-day trip to Gulmarg. Take the famous Gondola cable car ride to Apharwat Peak for snow panoramas and alpine trails.',
      },
      {
        day: 4,
        title: 'Pahalgam Valley of Shepherds',
        description:
          'Drive to Pahalgam along saffron fields. Explore Betaab Valley, Aru Valley, and the Lidder River banks.',
      },
      {
        day: 5,
        title: 'Sonamarg Meadow of Gold',
        description:
          'Excursion to Sonamarg. Enjoy pony rides to Thajiwas Glacier and witness turquoise mountain streams.',
      },
      {
        day: 6,
        title: 'Departure from Srinagar',
        description:
          'Morning breakfast on the houseboat deck before transfer to Srinagar Airport with lifelong memories.',
      },
    ],
    inclusions: [
      '2 Nights Luxury Houseboat Stay on Dal Lake',
      '3 Nights Premium Resort Stay in Srinagar & Pahalgam',
      'Daily Breakfast and Gourmet Dinners',
      'Private Shikara Ride on Dal Lake',
      'Phase 1 Gulmarg Gondola Cable Car Tickets',
      'Private AC SUV Transfers & Sightseeing',
    ],
    exclusions: [
      'Flight Tickets to/from Srinagar',
      'Pony/Horse Rides in Sonamarg or Pahalgam',
      'Union Taxi inside Betaab & Aru Valleys',
      'Personal Skiing or Winter Activity Fees',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617653272990-272e293883c5?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    slug: 'rajasthan-royal-tour',
    name: 'Rajasthan Royal Tour',
    destination: 'Rajasthan, India',
    duration: '7 Days / 6 Nights',
    tagline: 'Majestic Forts, Palaces & Desert Culture',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Royal Heritage Palace Hotel Accommodations',
      'Jaipur Amer Fort Jeep Ride & City Palace Tour',
      'Jodhpur Mehrangarh Fort & Thar Desert Safari',
      'Udaipur Lake Pichola Sunset Boat Cruise',
    ],
    placesToVisit: [
      {
        name: 'Amer Fort & Hawa Mahal (Jaipur)',
        description: 'Grand hilltop fortress with mirror palaces and iconic Pink City honeycomb architecture.',
      },
      {
        name: 'Mehrangarh Fort (Jodhpur)',
        description: 'Towering citadel overlooking the Blue City, Jaswant Thada marble cenotaphs.',
      },
      {
        name: 'Thar Desert Dunes',
        description: 'Golden sand dunes featuring camel safaris, Kalbeliya folk dances, and starry desert nights.',
      },
      {
        name: 'Lake Pichola & City Palace (Udaipur)',
        description: 'Romantic City of Lakes with lakefront palace tours and sunset boat cruises.',
      },
    ],
    overview:
      'Step back into grand royal eras with a bespoke circuit across Jaipur, Jodhpur, and Udaipur. Stay in heritage palaces, witness desert sunsets, and discover vibrant bazaars.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur (The Pink City)',
        description:
          'Arrive in Jaipur and check into your heritage hotel. Visit City Palace and witness the evening light ceremony.',
      },
      {
        day: 2,
        title: 'Amer Fort & Jaipur Royal Treasures',
        description:
          'Elephant or jeep ride up Amer Fort. Tour Hawa Mahal, Jal Mahal, and Jantar Mantar observatory.',
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur (The Blue City)',
        description:
          'Drive to Jodhpur. Visit the towering Mehrangarh Fort and Jaswant Thada, followed by a walk through clocktower markets.',
      },
      {
        day: 4,
        title: 'Desert Dunes & Cultural Evening',
        description:
          'Experience a camel safari in the Thar Desert with folk music, Kalbeliya dance, and traditional Rajasthani dinner under starry skies.',
      },
      {
        day: 5,
        title: 'Jodhpur to Udaipur via Ranakpur',
        description:
          'Drive to Udaipur, stopping at the marvelously carved Ranakpur Jain Temple en route. Check into your lakefront palace hotel.',
      },
      {
        day: 6,
        title: 'Udaipur Lake Pichola & City Palace',
        description:
          'Explore City Palace Udaipur, Saheliyon-ki-Bari, and take a romantic boat cruise on Lake Pichola during sunset.',
      },
      {
        day: 7,
        title: 'Departure from Udaipur',
        description:
          'Enjoy breakfast overlooking Lake Pichola before your private transfer to Udaipur Airport.',
      },
    ],
    inclusions: [
      '6 Nights Royal Heritage Hotel Stay (Jaipur, Jodhpur, Udaipur)',
      'Daily Breakfast & Royal Thali Dinners',
      'Private Chauffeur-Driven AC Vehicle throughout',
      'Lake Pichola Sunset Boat Cruise',
      'Amer Fort Jeep Ride & Monument Entry Tickets',
      'Desert Safari & Cultural Performance Evening',
    ],
    exclusions: [
      'Flights or Train Fares',
      'Camera Fees at Palaces',
      'Personal Shopping & Gratuities',
      'Travel Insurance',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    slug: 'himachal-adventure',
    name: 'Himachal Adventure',
    destination: 'Himachal Pradesh, India',
    duration: '6 Days / 5 Nights',
    tagline: 'Snowy Peaks, Pine Forests & Thrills',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Shimla Mall Road & Kufri Snow Point Walks',
      'Manali Solang Valley & Atal Tunnel Excursion',
      'Kullu White-Water Rafting & Beas River Valley',
      'Ancient Hadimba Temple & Vashisht Hot Springs',
    ],
    placesToVisit: [
      {
        name: 'Shimla Mall Road & Kufri',
        description: 'Historic colonial hill resort, Ridge promenade, and panoramic Himalayan snow points.',
      },
      {
        name: 'Solang Valley & Atal Tunnel',
        description: 'High-altitude adventure hub for paragliding, snow sports, and engineering marvels.',
      },
      {
        name: 'Kullu River Valley',
        description: 'Scenic Beas river valley famous for white-water rafting and traditional shawl weaving.',
      },
      {
        name: 'Hadimba Temple (Manali)',
        description: '500-year-old wooden pagoda temple set within ancient cedar pine forests.',
      },
    ],
    overview:
      'Unwind in the pristine alpine wilderness of Shimla, Manali, and Solang Valley. Enjoy pine mountain breezes, snow adventures, river rafting, and serene monasteries.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Chandigarh & Drive to Shimla',
        description:
          'Pickup from Chandigarh and scenic drive to Shimla. Walk along the historic Mall Road and Ridge evening promenade.',
      },
      {
        day: 2,
        title: 'Kufri Snow Point & Heritage Walk',
        description:
          'Visit Kufri pine forests, Jakhoo Temple, and enjoy horse riding and panoramic views of Himalayan peaks.',
      },
      {
        day: 3,
        title: 'Shimla to Manali via Kullu Valley',
        description:
          'Drive along the Beas River to Manali, stopping at Kullu for shawl weaving shopping and optional white-water rafting.',
      },
      {
        day: 4,
        title: 'Solang Valley & Atal Tunnel Adventure',
        description:
          'Full-day adventure at Solang Valley and Atal Tunnel. Enjoy paragliding, snow scooter rides, and cable car thrills.',
      },
      {
        day: 5,
        title: 'Manali Local Sights & Hadimba Temple',
        description:
          'Visit 500-year-old Hadimba Temple, Vashisht Hot Springs, Tibetan Monastery, and Old Manali cafes.',
      },
      {
        day: 6,
        title: 'Departure from Chandigarh',
        description:
          'Drive down to Chandigarh for your onward flight or train connection.',
      },
    ],
    inclusions: [
      '5 Nights Luxury Mountain Resort Stay (Shimla & Manali)',
      'Daily Buffet Breakfast and Dinner',
      'Private AC SUV Transfer & Mountain Sightseeing',
      'Solang Valley Excursion Package',
      'Toll, Driver Allowances & Mountain Parking Fees',
    ],
    exclusions: [
      'Flight or Train Tickets',
      'Paragliding, Skiing & Rafting Activity Costs',
      'Rohtang Pass Green Permit & Local Taxis',
      'Travel Insurance',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    slug: 'andaman-island-escape',
    name: 'Andaman Island Escape',
    destination: 'Andaman Islands, India',
    duration: '6 Days / 5 Nights',
    tagline: 'Turquoise Waters & Exotic Beaches',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Asia’s Best Beach - Radhanagar Beach Sunset',
      'Elephant Beach Speedboat Ride & Coral Reef Snorkeling',
      'High-Speed Luxury Ferry Cruises (Port Blair, Havelock, Neil)',
      'Historic Cellular Jail Light & Sound Show',
    ],
    placesToVisit: [
      {
        name: 'Radhanagar Beach (Havelock)',
        description: 'Consistently rated Asia’s best beach, featuring powder-white sands and turquoise waters.',
      },
      {
        name: 'Elephant Beach',
        description: 'Vibrant coral reef sanctuary famous for complimentary snorkeling and underwater sea walks.',
      },
      {
        name: 'Neil Island & Laxmanpur Beach',
        description: 'Tranquil island retreat known for natural rock bridges and spectacular tropical sunsets.',
      },
      {
        name: 'Cellular Jail (Port Blair)',
        description: 'National historic memorial featuring the inspiring evening Light & Sound show.',
      },
    ],
    overview:
      'Escape to tropical paradise in the Bay of Bengal. Visit Port Blair, Havelock Island, and Neil Island. Snorkel over coral reefs, relax on Radhanagar Beach, and unwind in island luxury.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Port Blair & Cellular Jail',
        description:
          'Arrive in Port Blair. Visit historic Cellular Jail and watch the evening Light & Sound Show.',
      },
      {
        day: 2,
        title: 'High-Speed Ferry to Havelock Island',
        description:
          'Board a luxury cruise ferry to Havelock Island. Spend the afternoon at Radhanagar Beach, rated Asia’s best beach.',
      },
      {
        day: 3,
        title: 'Elephant Beach Snorkeling & Coral Reefs',
        description:
          'Speedboat ride to Elephant Beach. Enjoy complimentary snorkeling and underwater sea walk among colourful corals.',
      },
      {
        day: 4,
        title: 'Neil Island Coastal Charm',
        description:
          'Ferry to tranquil Neil Island. Explore Bharatpur Beach, Laxmanpur Beach sunset point, and the Natural Rock Bridge.',
      },
      {
        day: 5,
        title: 'Return to Port Blair & Chidiya Tapu',
        description:
          'Ferry back to Port Blair. Afternoon trip to Chidiya Tapu (Bird Island) for spectacular sunset views.',
      },
      {
        day: 6,
        title: 'Departure from Port Blair',
        description:
          'Breakfast at resort before your transfer to Veer Savarkar International Airport.',
      },
    ],
    inclusions: [
      '5 Nights Luxury Beach Resort Accommodation',
      'Daily Breakfast & Gourmet Island Dinners',
      'Inter-Island Luxury Catamaran Cruise Ferry Tickets (Makruzz/Nautika)',
      'Complimentary Snorkeling Experience at Elephant Beach',
      'All Private Transfers & Island Sightseeing',
      'Cellular Jail Entry & Light Show Tickets',
    ],
    exclusions: [
      'Flight Tickets to/from Port Blair',
      'Scuba Diving & Sea Walk Upgrades',
      'Personal Camera Charges',
      'Travel Insurance',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    ],
  },
]

export type Experience = {
  name: string
  description: string
  image: string
}

export const EXPERIENCES: Experience[] = [
  {
    name: 'Family Holidays',
    description: 'Thoughtful itineraries the whole family will remember.',
    image: '/images/exp-family.png',
  },
  {
    name: 'Honeymoon Escapes',
    description: 'Romantic getaways designed for two.',
    image: '/images/exp-luxury.png',
  },
  {
    name: 'Luxury Holidays',
    description: 'Five-star stays and effortless indulgence.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Adventure Trips',
    description: 'Thrilling journeys for the bold at heart.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Group Tours',
    description: 'Shared discoveries with like-minded travellers.',
    image: '/images/exp-family.png',
  },
  {
    name: 'Corporate Travel',
    description: 'Seamless business travel and incentive trips.',
    image: '/images/exp-corporate.png',
  },
]

export const STATS = [
  { value: '5000+', label: 'Happy Travellers' },
  { value: '50+', label: 'Indian Destinations' },
  { value: '24/7', label: 'Travel Support' },
]

export type Testimonial = {
  name: string
  location: string
  quote: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Priya & Vikram Sharma',
    location: 'Kerala Backwaters',
    quote:
      'Every detail was handled with such care. From the houseboat in Alleppey to the tea plantations in Munnar, it was the most seamless holiday we have ever taken.',
    rating: 5,
  },
  {
    name: 'Rajesh Menon',
    location: 'Kashmir Paradise',
    quote:
      'Roam & Relax planned a flawless family trip to Kashmir. The Shikara ride on Dal Lake and Gulmarg Gondola were highlights. The team was extraordinarily responsive.',
    rating: 5,
  },
  {
    name: 'Ananya & Rohan Mehta',
    location: 'Goa Beach Escape',
    quote:
      'A truly luxurious getaway! The beachfront resort and private catamaran cruise exceeded our expectations. We cannot wait to book our next journey.',
    rating: 5,
  },
]
