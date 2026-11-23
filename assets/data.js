/* ==========================================================================
   CAIRN & AXLE — SHARED EDITABLE DEMO DATA STORE (assets/data.js)
   All prices (INR), departure dates, credentials, and reviews are editable
   demo content ready to be replaced with your live operational catalogue.
   ========================================================================== */
window.CAIRN_AXLE_DATA = {
  TRIPS: [
    {
      id: 'leh-ladakh',
      title: 'Leh–Ladakh & Khardung La Traverse',
      shortName: 'LEH–LADAKH',
      category: 'Mountain Escapes',
      price: '₹48,500',
      priceNum: 48500,
      suvAddon: 24000,
      sharedAddon: 9500,
      duration: '9 Days',
      distance: '1,420 km',
      difficulty: 'Challenging',
      departure: '14 Jun 2027',
      seats: 4,
      season: 'June – September',
      startEnd: 'Manali → Leh (Loop)',
      maxElevation: '5,359 m',
      coords: "34°16'N · 77°35'E · 5,359M",
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=85',
      alt: 'Snow-dusted high Himalayan mountain ridge above an expedition pass',
      teaser: 'Cross high-altitude snow corridors, Nubra river sands, and cobalt Pangong shores in a 6-vehicle radio-linked 4x4 convoy.',
      overview: 'Engineered around a measured acclimatisation staircase, this flagship 9-day self-drive carries six convoy vehicles through the Atal Tunnel, over Baralacha La and Khardung La, across Nubra apricot orchards, and along the remote Shyok river track to Pangong Tso.',
      highlights: [
        ['Day 01–02 · Manali to Jispa', 'Convoy flag-off, VHF radio calibration, Atal Tunnel transit & riverside cedar-camp acclimatisation.'],
        ['Day 03–04 · High Passes to Leh', 'Baralacha La, Gata Loops, More Plains plateau run & golden-hour descent into Leh heritage stay.'],
        ['Day 05–06 · Khardung La & Nubra', 'Summit crossing at 5,359m into Hundar sand ridges, Bactrian camel tracks & Turtuk walnut orchards.'],
        ['Day 07–09 · Shyok to Pangong & Return', 'Remote river-valley trail to Pangong Tso lakeside domes, Chang La pass & farewell Ladakhi table.']
      ],
      inclusions: [
        '8 nights in boutique heritage hotels & heated glamping domes',
        'Curated breakfast & regional dinner tables every day',
        'Lead & Sweep Road Captains + 2-way VHF radios in every car',
        'Inner-Line Permits, mechanical recovery crew & medical oxygen'
      ],
      exclusions: [
        'Personal fuel, toll charges & optional 4x4 rental vehicle fee',
        'Flights/transfers to Manali start point and from Leh',
        'Personal travel insurance & monument camera tickets'
      ]
    },
    {
      id: 'konkan-coast',
      title: 'Konkan & Western Coast Highway',
      shortName: 'KONKAN COAST',
      category: 'Coastal Road Trips',
      price: '₹26,900',
      priceNum: 26900,
      suvAddon: 14500,
      sharedAddon: 6000,
      duration: '5 Days',
      distance: '890 km',
      difficulty: 'Leisurely',
      departure: '08 Nov 2027',
      seats: 6,
      season: 'October – March',
      startEnd: 'Alibaug → South Goa',
      maxElevation: '185 m',
      coords: "16°59'N · 73°18'E · SEA LEVEL",
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
      alt: 'Golden sunlight over rolling coastal ocean waves and shoreline',
      teaser: 'Red-laterite coastal lanes, car-ferry river crossings, centuries-old sea forts, and Malvani spice tables along Maharashtra & Goa.',
      overview: 'Trade six-lane concrete highways for the undulating coastal ribbon linking Alibaug to South Goa. Expect vehicle ferries across mangrove creeks, sunset cliff drives at Aare Ware, quiet fishing coves, and curated Malvani coastal suppers.',
      highlights: [
        ['Day 01 · Alibaug to Murud', 'Dawn departure along Kashid curves, palm-lined cliffs & sea-fort twilight walk.'],
        ['Day 02 · Ferry Crossings to Guhagar', 'Roll-on vehicle ferry across Dighi–Agardanda creek & unhurried ridge drive to Guhagar.'],
        ['Day 03 · Aare Ware Panoramic Highway', 'Ganpatipule cliff bends, Ratnagiri lighthouse & boutique hillside manor dinner.'],
        ['Day 04–05 · Tarkarli to South Goa', 'Backwater headland roads, Vengurla spice plantation brunch & South Goa coastal finale.']
      ],
      inclusions: [
        '4 nights at boutique coastal villas & heritage bungalows',
        'Daily breakfast, curated Malvani dinners & ferry vehicle tickets',
        'Road Captain convoy lead, VHF radios & printed coastal route book',
        'On-call tyre & mechanical backup across the entire stretch'
      ],
      exclusions: [
        'Fuel, highway tolls & optional self-drive rental car',
        'Lunches en route and optional watersports activities',
        'Personal expenses & travel insurance'
      ]
    },
    {
      id: 'thar-desert',
      title: 'Great Thar & Jaisalmer Dune Trail',
      shortName: 'THAR DESERT',
      category: 'Desert Expeditions',
      price: '₹32,400',
      priceNum: 32400,
      suvAddon: 18500,
      sharedAddon: 7500,
      duration: '6 Days',
      distance: '1,150 km',
      difficulty: 'Moderate',
      departure: '22 Nov 2027',
      seats: 5,
      season: 'November – February',
      startEnd: 'Jodhpur → Jaisalmer → Khimsar',
      maxElevation: '290 m',
      coords: "26°54'N · 70°54'E · 225M",
      image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1400&q=85',
      alt: 'Sweeping amber desert sand dunes bathed in warm late-afternoon shadows',
      teaser: 'Arrow-straight desert tarmac, private 4x4 sand-track navigation, lantern-lit dune camps, and royal sandstone havelis.',
      overview: 'Roll past sandstone stepwells onto empty desert tarmac stretching toward Rajasthan’s western frontier. Learn tyre-deflation sand driving from our overland captains and spend unhurried evenings beneath zero-glare winter stars.',
      highlights: [
        ['Day 01–02 · Jodhpur to Osian Dunes', 'Blue-city flag-off, ancient stepwells & private desert manor sunset welcome.'],
        ['Day 03–04 · Longewala Frontier & Private Camp', 'Arrow-straight border highway, Tanot dunes & exclusive lantern-lit dune bivouac.'],
        ['Day 05 · Jaisalmer Living Fort', 'Guided morning walk through carved havelis, Kuldhara ruins & private folk supper.'],
        ['Day 06 · Khimsar Sand Loop', 'Morning dune-track driving clinic & celebratory farewell courtyard brunch.']
      ],
      inclusions: [
        '5 nights across heritage havelis & private luxury dune camps',
        'Breakfast, bonfire dinners & desert folk acoustic evening',
        'Sand-driving clinic, deflators/compressors & sweep recovery 4x4',
        'VHF convoy radios, permits & custom waterproof route atlas'
      ],
      exclusions: [
        'Fuel, tolls & optional 4x4 fleet SUV upgrade',
        'Lunches, drinks & optional dune buggy/camel experiences',
        'Personal travel coverage'
      ]
    },
    {
      id: 'coorg-ridge',
      title: 'Coorg & Chikmagalur Misty Ridge',
      shortName: 'COORG RIDGE',
      category: 'Weekend Getaways',
      price: '₹14,800',
      priceNum: 14800,
      suvAddon: 8500,
      sharedAddon: 3800,
      duration: '3 Days',
      distance: '540 km',
      difficulty: 'Easy',
      departure: '04 Dec 2027',
      seats: 7,
      season: 'Year-Round',
      startEnd: 'Bengaluru → Coorg → Chikmagalur',
      maxElevation: '1,925 m',
      coords: "12°25'N · 75°44'E · 1,180M",
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85',
      alt: 'Morning mist drifting across forested mountain ridges at sunrise',
      teaser: 'A brisk 72-hour escape out of the city through emerald coffee estates, winding misty ghats, and estate-roast pour-over mornings.',
      overview: 'Built for busy calendars and first-time convoy drivers alike. Leave city traffic at dawn and trade noise for pepper-scented hairpin roads, historic coffee planter bungalows, and Mullayanagiri cloud ridges.',
      highlights: [
        ['Day 01 · Bengaluru to Madikeri Estates', '6:00 AM rollout, highway breakfast halt & sweeping climb into shaded coffee estates.'],
        ['Day 02 · Mandalpatti Ridge & Coffee Curing', 'Scenic hill-top drive, single-estate pour-over tasting & Kodava estate bonfire dinner.'],
        ['Day 03 · Mullayanagiri Cloud Crest & Return', 'Sunrise switchbacks up Karnataka’s highest peak before an easy Sunday return cruise.']
      ],
      inclusions: [
        '2 nights at heritage plantation bungalows',
        'Estate breakfasts, Kodava supper & private coffee-tasting session',
        'Lead Road Captain, VHF handsets & beginner hill-drive briefing'
      ],
      exclusions: [
        'Fuel, expressway tolls & optional rental car',
        'Midday cafe stops & personal purchases'
      ]
    },
    {
      id: 'satpura-canopy',
      title: 'Satpura & Kanha Canopy Drive',
      shortName: 'SATPURA FOREST',
      category: 'Forest & Wildlife Drives',
      price: '₹28,500',
      priceNum: 28500,
      suvAddon: 15000,
      sharedAddon: 6500,
      duration: '5 Days',
      distance: '780 km',
      difficulty: 'Moderate',
      departure: '18 Dec 2027',
      seats: 3,
      season: 'October – April',
      startEnd: 'Bhopal → Satpura → Kanha',
      maxElevation: '1,100 m',
      coords: "22°31'N · 78°26'E · 640M",
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85',
      alt: 'Golden sunbeams piercing a towering ancient forest canopy',
      teaser: 'Teak-canopied forest highways, naturalist-led wildlife safaris, river-crossing lodges, and hushed night-sky listening sessions.',
      overview: 'Wind beneath towering Central Indian teak and sal corridors linking two of India’s most biodiverse reserves. Combines soulful woodland driving with silent dawn canoes and open-gypsy wildlife drives led by senior naturalists.',
      highlights: [
        ['Day 01–02 · Bhopal to Pachmarhi & Madhai', 'Plateau switchbacks, sandstone viewpoints & boat transfer to riverfront timber lodge.'],
        ['Day 03 · Satpura Core & Canoe Float', 'Silent dawn paddle, naturalist-guided core safari & night-forest acoustics talk.'],
        ['Day 04–05 · Sal Corridor to Kanha', 'Shaded forest-edge drive into Kanha meadows & sunrise meadow safari finale.']
      ],
      inclusions: [
        '4 nights in luxury eco-timber wilderness lodges',
        'All lodge meals, 2 core-zone jeep safaris & dawn canoe excursion',
        'Road Captain convoy crew, VHF radios & senior resident naturalist'
      ],
      exclusions: [
        'Fuel, tolls & optional self-drive SUV hire',
        'Camera fees at national park gates & personal tips'
      ]
    },
    {
      id: 'spiti-rann',
      title: 'Spiti Valley to Rann Grand Circuit',
      shortName: 'SPITI–RANN',
      category: 'Cross-Country Adventures',
      price: '₹74,900',
      priceNum: 74900,
      suvAddon: 36000,
      sharedAddon: 14500,
      duration: '14 Days',
      distance: '3,280 km',
      difficulty: 'Expedition',
      departure: '10 Jan 2028',
      seats: 2,
      season: 'Autumn / Winter Special',
      startEnd: 'Shimla → Spiti → Rajasthan → Kutch',
      maxElevation: '4,520 m',
      coords: "32°14'N · 78°02'E · 4,270M",
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
      alt: 'Sweeping cross-country highway carving across vast open terrain',
      teaser: 'Our flagship trans-regional overland odyssey — moving from arid Himalayan stone valleys through golden deserts to the white salt flats of Kutch.',
      overview: 'Our most ambitious overland expedition: fourteen days watching climate, stone, cuisine, and light transform across three thousand two hundred kilometres — from cliff-carved Kinnaur highways down to the luminous moonlit salt plains of the Great Rann.',
      highlights: [
        ['Days 01–04 · Shimla, Kinnaur & Kaza', 'Hindustan–Tibet cliff roads, Nako alpine village & Key Monastery valley loop.'],
        ['Days 05–08 · Descent to Rajasthan Dunes', 'Cross-country highway rhythm into Bikaner heritage forts & golden desert corridors.'],
        ['Days 09–12 · Little & Great Rann of Kutch', 'Salt-pan perimeter tracks, flamingo wetlands & full-moon white desert evening.'],
        ['Days 13–14 · Mandvi Coast & Bhuj Finale', 'Historic wooden-dhow shipyards, artisan courtyard visit & expedition awards supper.']
      ],
      inclusions: [
        '13 nights across mountain boutique stays, havelis & Rann luxury tents',
        'Breakfast & dinner throughout + two Expedition Captains + dedicated mechanic truck',
        'All regional permits, VHF radio network, oxygen/med kit & printed expedition logbook'
      ],
      exclusions: [
        'Fuel, highway tolls & optional 4x4 overland vehicle hire',
        'Flights to Shimla/Chandigarh and return from Bhuj',
        'Lunches & personal insurance'
      ]
    }
  ],

  GALLERY: [
    { title: 'High-Pass Morning Light', category: 'Scenic Mountain Drives', theme: 'mountains', span: 'hero-tall', mask: 'arch', location: "34°16'N · 77°35'E · 4,880M", desc: 'First-light convoy push over crisp mountain switchbacks before valley cloud cover lifts.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85', alt: 'Dramatic jagged mountain peaks illuminated at golden hour above a high pass' },
    { title: 'Salt Air & Winding Headlands', category: 'Coastal Highways', theme: 'coastal', span: 'wide-top', mask: 'chamfer', location: "16°59'N · 73°18'E · SEA LEVEL", desc: 'Windows down along sweeping cliffside curves overlooking deep turquoise bays.', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=85', alt: 'Sunlit ocean surf rolling along an expansive golden coastal shoreline' },
    { title: 'Endless Horizon Asphalt', category: 'Desert Landscapes', theme: 'desert', span: 'mid-arch', mask: 'pill', location: "26°54'N · 70°54'E · THAR EDGE", desc: 'Zero traffic, terracotta sunset light, and two hundred kilometres of golden desert asphalt.', image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1400&q=85', alt: 'Open desert road vanishing toward warm amber mountains at sunset' },
    { title: 'Sunlit Ridge & Timber Mist', category: 'Forest Adventures', theme: 'forest', span: 'side-drop', mask: 'arch', location: "12°25'N · 75°44'E · WESTERN GHATS", desc: 'Early morning steam rising through ancient timber corridors after overnight hill rain.', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=85', alt: 'Sunlight breaking over misty pine forest valleys along a wilderness route' },
    { title: 'Classic Wheels, Shared Stories', category: 'Group Road Trips', theme: 'convoy', span: 'low-left', mask: 'chamfer', location: "15°29'N · 73°49'E · CONVOY HALT", desc: 'Coffee brewed on the tailgate while the convoy compares route notes and camera rolls.', image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=1400&q=85', alt: 'Vintage camper expedition vehicle parked along an open coastal route' },
    { title: 'Lantern Glow Under Alpine Pines', category: 'Campsites & Outdoor', theme: 'convoy', span: 'overlap', mask: 'pill', location: "32°38'N · 77°11'E · BASECAMP", desc: 'Heated expedition tents set in private forested clearings far off the tourist map.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=85', alt: 'Illuminated expedition tent pitched in an alpine meadow at twilight' },
    { title: 'Zero-Light-Pollution Stargazing', category: 'Mountain Night Camps', theme: 'mountains', span: 'wide-end', mask: 'arch', location: "32°14'N · 78°02'E · SPITI", desc: 'Clear high-altitude skies where the Milky Way arches directly above our camp circle.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85', alt: 'Starry night sky arching over snow-dusted mountain summits' },
    { title: 'Rolling Out At First Light', category: 'Cross-Country Convoys', theme: 'convoy', span: 'banner', mask: 'chamfer', location: "23°50'N · 69°49'E · CIRCUIT", desc: 'Radio checks complete, thermos filled, and five vehicles rolling smoothly into sunrise.', image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1400&q=85', alt: 'Open highway stretching through wilderness terrain during a group road trip' }
  ],

  TESTIMONIALS: [
    { name: 'Aarav Mehta', role: 'Sample Traveller · Mumbai', destination: 'Leh–Ladakh Traverse', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', quote: 'Driving my own SUV over Khardung La with Cairn & Axle felt effortless. Having a Road Captain calling every blind hairpin over VHF radio turned nervous altitude miles into pure cinematic joy.' },
    { name: 'Meera Nair', role: 'Sample Solo Traveller · Kochi', destination: 'Great Thar Dune Trail', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', quote: 'I joined solo and left with ten lifelong road companions. The desert sunset camp, the vintage haveli dinners, and the zero-rush pacing felt nothing like a conventional tour agency.' },
    { name: 'Kabir & Riya Deshmukh', role: 'Sample Couple · Pune', destination: 'Konkan Coastal Highway', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', quote: 'Every ferry timing, hidden cliff viewpoint, and coastal lunch table was choreographed to perfection — yet we still had total freedom to pull over whenever the light hit the ocean just right.' },
    { name: 'Ananya Kulkarni', role: 'Sample Photographer · Bengaluru', destination: 'Satpura & Kanha Canopy Drive', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', quote: 'Small convoy size makes all the difference. We rolled out before dawn into misty forest bends, spotted wildlife in silence, and never once felt herded or hurried.' },
    { name: 'Devansh Kapoor', role: 'Sample First-Time Driver · Delhi', destination: 'Coorg Misty Ridge Weekend', rating: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', quote: 'My first organised road trip and easily the best three days I have spent behind a steering wheel. The pre-trip briefing and route book made every kilometre feel like an automotive film.' }
  ],

  STORIES: [
    { id: 'story-mountain-pacing', category: 'Road Trip Guides', title: 'How to Pace a 9-Day Himalayan Self-Drive Without Burning Out', readTime: '6 min read', date: 'Autumn Issue · Demo Editorial', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85', excerpt: 'Why the secret to unforgettable high-altitude road trips lies in 180-kilometre driving days, deliberate altitude steps, and 6:30 AM flag-offs.', paragraphs: ['Most self-planned mountain itineraries collapse under a single mistake: measuring highland roads using plains-highway intuition. Two hundred kilometres across two mountain passes takes twice the concentration and delivers ten times the visual intensity of an expressway sprint.', 'At Cairn & Axle, we structure every Himalayan traverse around an acclimatisation staircase. We gain sleeping elevation gradually, anchor mornings with early departures when glacial streams run lowest, and pull into boutique river camps while afternoon light still warms the valley walls.', 'Leave two unscheduled hours in every driving day. That margin is where roadside apricot stalls, spontaneous drone stops, and quiet conversations over hot butter tea actually happen.'], quote: 'Great road trips are never measured in average speed — they are measured in how often nobody wants to get back in the car.' },
    { id: 'story-scenic-routes', category: 'Best Scenic Routes', title: "Five Underrated Coastal & Ridge Bends You Won't Find on Fast Expressways", readTime: '5 min read', date: 'Route Archive · Demo Editorial', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85', excerpt: 'From laterite cliff ledges above the Arabian Sea to mist-wrapped spice corridors in the Western Ghats, here is why turning off the national highway pays off.', paragraphs: ['Navigation apps are obsessed with shaving eleven minutes off your arrival time. Yet eleven minutes saved on a six-lane concrete bypass often costs you the single coastal headland or cedar tunnel you left home to witness.', 'Our route scouts test state highways, jetty-linked coastal spurs, and old plantation ridge roads every season. Between Aare Ware’s sweeping ocean S-curves and the forest canopies around Madhai, India’s best driving ribbons sit just one turn off the trunk grid.', 'Next time your map suggests a faster bypass, switch to terrain view, look for contour lines hugging water or ridgelines, and choose the line that curves.'], quote: 'Whenever a highway straightens out, the story usually steps off onto the old road beside it.' },
    { id: 'story-convoy-tips', category: 'Travel Tips', title: 'Convoy Radio Etiquette: Seven Callouts Every Group Driver Should Know', readTime: '4 min read', date: 'Field Manual · Demo Editorial', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=85', excerpt: 'Clear, calm two-way radio communication turns five separate cars into one fluid, confident team on narrow ghats and gravel tracks.', paragraphs: ['Anyone who has driven in a well-orchestrated convoy knows the quiet thrill when a handheld radio crackles with crisp, timely updates: "Lead clear of hairpin four, oncoming bus descending, hold wide on the left."', 'Good convoy radio discipline keeps chatter concise. Every vehicle uses a numbered callsign (Car 1 through Sweep), confirms turns once the car behind acknowledges, and never overtakes blindly without a clear visibility call from the vehicle ahead.', 'Before every Cairn & Axle flag-off, we spend fifteen minutes calibrating handsets and practising simple callouts. By lunch on Day One, even first-time drivers sound like seasoned overland crew.'], quote: 'A well-timed three-word radio callout is worth more than a hundred horsepower on a mountain pass.' },
    { id: 'story-packing', category: 'Packing Essentials', title: 'The Trunk Blueprint: Soft Duffels, Recovery Gear & Cabin Comforts', readTime: '7 min read', date: 'Gear Dispatch · Demo Editorial', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1400&q=85', excerpt: "How to pack an expedition boot cleanly so layers, cameras, tyres, and roadside pour-over coffee are always within arm's reach.", paragraphs: ['Hard-shell cabin suitcases rattle, bruise interior trim, and leave awkward dead pockets in an SUV boot. Switch to weather-resistant 60L soft duffels paired with colour-coded packing cubes — one for warm mid-layers, one for camp evenings, and a dedicated daypack behind the front seat.', 'Keep cabin essentials accessible without popping the tailgate: polarised driving sunglasses, lip balm, a 12V multi-port charger, reusable insulated flasks, and offline GPX maps cached on your phone.', 'Our sweep vehicle carries heavy recovery straps, tyre inflators, jump starters, and medical oxygen — freeing your trunk for what belongs there: cameras, warm jackets, and room for local crafts.'], quote: 'Pack light enough to unload in ninety seconds, and smart enough to greet a sudden mountain squall with a smile.' },
    { id: 'story-thar-nights', category: 'Destination Stories', title: 'After the Tour Buses Leave: Quiet Twilight Hours Deep in the Thar', readTime: '6 min read', date: 'Desert Diary · Demo Editorial', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=85', excerpt: 'Thirty kilometres beyond the crowded sunset points lies a sea of untouched ripples, brass lanterns, and desert silence you can practically hear.', paragraphs: ['At 5:15 PM the desert transforms. The glare drops away, sand ripples cast razor-sharp charcoal shadows, and the dunes glow the exact shade of burnt terracotta.', 'Rather than stopping at roadside camel clusters, our Thar convoy drops tyre pressure by 8 PSI and follows a local tracker along a vetted sand spur to a private ridge. By the time engines tick softly as they cool, the horizon holds nothing but wind and distant folk strings.', 'Sleeping under winter desert stars reminds you how vast quietness feels — and why four wheels are still the finest passport to uncrowded horizons.'], quote: 'Thirty kilometres past the last souvenir stall, the desert finally remembers its own voice.' },
    { id: 'story-spiti-diary', category: 'Adventure Diaries', title: 'Day Eleven of the Grand Circuit: Snow Dusting to White Salt Flats', readTime: '8 min read', date: 'Expedition Log · Demo Editorial', image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=1400&q=85', excerpt: "Reflections from a 3,280-kilometre trans-regional drive where six strangers watched India's topography shift from monastery cliffs to moonlit salt.", paragraphs: ['Flying compresses geography into sterile airport lounges; driving lets you watch geology, architecture, dialect, and spice palettes evolve kilometre by kilometre through the windshield.', 'Over fourteen days from high stone valleys down across plains and into the luminous expanse of the Rann, our convoy watched frost give way to mustard fields, then red sandstone fortresses, and finally blinding white crystalline salt under a rising full moon.', 'When the group parked in a semi-circle on the final evening, nobody checked their watch. Everybody was already tracing next winter’s route on the unfolded paper map laid across the bonnet.'], quote: 'A flight takes you from A to B. A road trip introduces you to every letter in between.' }
  ],

  LEGAL: {
    privacy: {
      title: 'Privacy Policy (Editable Demo Placeholder)',
      html: '<p><strong>Placeholder Notice:</strong> Replace this demo copy with your legal counsel’s reviewed Privacy Policy prior to launch.</p><p><strong>1. Data Collected:</strong> We collect only the contact details and travel preferences you voluntarily submit in our enquiry or newsletter forms.</p><p><strong>2. Purpose:</strong> Used strictly to prepare route dossiers, verify seat availability, arrange permits, and share opted-in dispatches. Never sold to third parties.</p>'
    },
    terms: {
      title: 'Terms & Conditions (Editable Demo Placeholder)',
      html: '<p><strong>Placeholder Notice:</strong> Replace these editable guidelines with your verified commercial, vehicle rental, and cancellation terms before accepting live bookings.</p><p><strong>1. Tariffs:</strong> INR prices shown across the site are illustrative demo rates subject to seasonal confirmation and vehicle tier.</p><p><strong>2. Safety & Weather:</strong> All self-drive guests must carry a valid driving licence and follow Road Captain safety and contingency-route calls.</p>'
    }
  }
};
