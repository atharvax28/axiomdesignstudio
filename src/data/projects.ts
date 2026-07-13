export interface Project {
  id: number;
  title: string;
  /** City-level. `Stats` counts distinct values as "Locations Served". */
  location: string;
  category: "Corporate" | "Hospitality" | "Retail" | "Residential";
  year: string;
  /** Carpet area. Absent where the source deck never states one. */
  size?: string;
  /** The card's preview shot. Usually photos[0], but may be pointed elsewhere. */
  image: string;
  /** Building or complex, where the company profile names one. */
  venue?: string;
  /** Interior style, taken from the company profile deck. */
  style?: string;
  /** The studio's own account of the project. Where absent, the case study falls
   *  back to generated copy. */
  description?: string;
  photos: string[];
}

export const projects: Project[] = [
  {
    "id": 1,
    "title": "Mahindra Finance (Hyderabad)",
    "location": "Hyderabad",
    "category": "Corporate",
    "year": "2023",
    "size": "12,500 SQ.FT",
    "image": "/projects/project-1/photo-2.jpg",
    "venue": "Sita City One",
    "style": "Corporate Workplace",
    "photos": [
      "/projects/project-1/photo-2.jpg",
      "/projects/project-1/photo-3.jpg",
      "/projects/project-1/photo-4.jpg",
      "/projects/project-1/photo-5.jpg",
      "/projects/project-1/photo-6.jpg",
      "/projects/project-1/photo-7.jpg",
      "/projects/project-1/photo-8.jpg",
      "/projects/project-1/photo-9.jpg",
      "/projects/project-1/photo-10.jpg",
      "/projects/project-1/photo-11.jpg",
      "/projects/project-1/photo-12.jpg",
      "/projects/project-1/photo-13.jpg"
    ]
  },
  {
    "id": 20,
    "title": "Mr. Vishal Kampani (Prabhadevi)",
    "location": "Prabhadevi",
    "category": "Residential",
    "year": "2023",
    "size": "4,200 SQ.FT",
    "image": "/projects/project-20/photo-1.png",
    "style": "Neo Classical Interior",
    "photos": [
      "/projects/project-20/photo-1.png",
      "/projects/project-20/photo-2.png",
      "/projects/project-20/photo-3.jpg",
      "/projects/project-20/photo-4.png",
      "/projects/project-20/photo-5.jpg",
      "/projects/project-20/photo-6.jpg",
      "/projects/project-20/photo-7.jpg"
    ]
  },
  {
    "id": 3,
    "title": "Mahindra Finance (Jaipur)",
    "location": "Jaipur",
    "category": "Corporate",
    "year": "2022",
    "size": "8,500 SQ.FT",
    "image": "/projects/project-3/photo-1.jpeg",
    "style": "Corporate Workplace",
    "photos": [
      "/projects/project-3/photo-1.jpeg",
      "/projects/project-3/photo-3.jpeg",
      "/projects/project-3/photo-4.jpeg",
      "/projects/project-3/photo-5.jpeg",
      "/projects/project-3/photo-6.jpeg",
      "/projects/project-3/photo-7.png"
    ]
  },
  {
    "id": 6,
    "title": "HDFC Securities (Kanjurmarg)",
    "location": "Kanjurmarg",
    "category": "Corporate",
    "year": "2023",
    "size": "25,000 SQ.FT",
    "image": "/projects/project-6/photo-1.jpeg",
    "style": "Modern Interior",
    "photos": [
      "/projects/project-6/photo-1.jpeg",
      "/projects/project-6/photo-2.jpeg",
      "/projects/project-6/photo-4.jpeg",
      "/projects/project-6/photo-5.jpeg",
      "/projects/project-6/photo-6.jpeg"
    ]
  },
  {
    "id": 7,
    "title": "Axis Asset Management (Pune)",
    "location": "Pune",
    "category": "Corporate",
    "year": "2021",
    "size": "13,000 SQ.FT",
    "image": "/projects/project-7/photo-2.jpeg",
    "style": "Modern Interior",
    "photos": [
      "/projects/project-7/photo-2.jpeg",
      "/projects/project-7/photo-3.jpeg",
      "/projects/project-7/photo-4.png",
      "/projects/project-7/photo-5.jpg"
    ]
  },
  {
    "id": 8,
    "title": "IDFC Bank (Airoli)",
    "location": "Airoli",
    "category": "Corporate",
    "year": "2024",
    "size": "25,000 SQ.FT",
    "image": "/projects/project-8/photo-1.jpg",
    "venue": "Mindspace",
    "style": "Modern Interior",
    "photos": [
      "/projects/project-8/photo-1.jpg",
      "/projects/project-8/photo-3.jpeg",
      "/projects/project-8/photo-5.png",
      "/projects/project-8/photo-6.png",
      "/projects/project-8/photo-7.jpeg"
    ]
  },
  {
    "id": 22,
    "title": "Jio BlackRock (Andheri East)",
    "location": "Andheri East",
    "category": "Corporate",
    "year": "2026",
    "image": "/projects/project-22/photo-1.jpeg",
    "venue": "Waterstones, Marol",
    "style": "Corporate Workplace",
    "description": "A workplace designed to support two high-performance functions — AMC (Asset Management) and Broking — each with its own rhythm, yet seamlessly connected through shared intelligence and culture. Deep corporate blues are balanced against warm yellow accents, with soft neutrals, natural materials and greenery holding the space between focus and energy.",
    "photos": [
      "/projects/project-22/photo-1.jpeg",
      "/projects/project-22/photo-2.jpg",
      "/projects/project-22/photo-3.jpg",
      "/projects/project-22/photo-4.jpg",
      "/projects/project-22/photo-5.jpeg",
      "/projects/project-22/photo-6.jpg",
      "/projects/project-22/photo-7.jpeg",
      "/projects/project-22/photo-8.jpg",
      "/projects/project-22/photo-9.jpeg",
      "/projects/project-22/photo-10.jpeg",
      "/projects/project-22/photo-11.jpeg",
      "/projects/project-22/photo-12.jpg",
      "/projects/project-22/photo-13.png",
      "/projects/project-22/photo-14.png",
      "/projects/project-22/photo-15.jpg",
      "/projects/project-22/photo-16.jpg",
      "/projects/project-22/photo-17.jpg",
      "/projects/project-22/photo-18.jpg",
      "/projects/project-22/photo-19.jpg",
      "/projects/project-22/photo-20.jpeg",
      "/projects/project-22/photo-21.jpg",
      "/projects/project-22/photo-22.jpg",
      "/projects/project-22/photo-23.jpg",
      "/projects/project-22/photo-24.jpg"
    ]
  },
  {
    "id": 9,
    "title": "Vihang Club House (Thane West)",
    "location": "Thane West",
    "category": "Hospitality",
    "year": "2021",
    "size": "40,500 SQ.FT",
    "image": "/projects/project-9/photo-0.png",
    "style": "Bali Style Interior",
    "description": "Completed during the pandemic. The ground-plus-three-storey building holds three types of banquet hall, twenty suites, and a ground-floor restaurant, delivered over fifteen months. Converting an office building to hospitality use raised significant services challenges, resolved alongside a specialist MEP consultant and handed over on schedule.",
    "photos": [
      "/projects/project-9/photo-0.png",
      "/projects/project-9/photo-5.jpg",
      "/projects/project-9/photo-6.jpg"
    ]
  },
  {
    "id": 10,
    "title": "Mahindra Meridian – Club House (Alibaug)",
    "location": "Alibaug",
    "category": "Hospitality",
    "year": "2022",
    "size": "5,500 SQ.FT",
    "image": "/projects/project-10/photo-2.jpg",
    "style": "Bali Style Interior",
    "description": "Building in an isolated location was the central challenge here. Natural materials were used throughout while keeping the interior proof against insects: wood panelling and cane sheets to the ceiling, and a cement mural forming the backdrop to the reception.",
    "photos": [
      "/projects/project-10/photo-2.jpg",
      "/projects/project-10/photo-3.jpg",
      "/projects/project-10/photo-4.jpg",
      "/projects/project-10/photo-5.jpg",
      "/projects/project-10/photo-6.jpg",
      "/projects/project-10/photo-7.jpeg"
    ]
  },
  {
    "id": 11,
    "title": "Kohar By Kanika (Bandra West)",
    "location": "Bandra West",
    "category": "Retail",
    "year": "2022",
    "size": "3,000 SQ.FT",
    "image": "/projects/project-11/photo-2.png",
    "style": "Jewellery Retail",
    "photos": [
      "/projects/project-11/photo-1.png",
      "/projects/project-11/photo-2.png",
      "/projects/project-11/photo-3.png",
      "/projects/project-11/photo-4.png"
    ]
  },
  {
    "id": 15,
    "title": "Mr. Dilip Bhatia (Mumbai)",
    "location": "Mumbai",
    "category": "Residential",
    "year": "2024",
    "size": "2,500 SQ.FT",
    "image": "/projects/project-15/photo-1.png",
    "venue": "Grand Windsor Residency",
    "style": "Luxurious Interior",
    "description": "A luxurious home completed within a ten-month timeline. Precious marble for the dining table top set the mint-green colour theme that carries through the living room.",
    "photos": [
      "/projects/project-15/photo-1.png",
      "/projects/project-15/photo-2.png",
      "/projects/project-15/photo-3.png",
      "/projects/project-15/photo-4.png",
      "/projects/project-15/photo-5.png",
      "/projects/project-15/photo-6.png",
      "/projects/project-15/photo-7.png",
      "/projects/project-15/photo-8.png",
      "/projects/project-15/photo-9.png",
      "/projects/project-15/photo-10.png"
    ]
  },
  {
    "id": 2,
    "title": "Jio Finance (Andheri)",
    "location": "Andheri",
    "category": "Corporate",
    "year": "2023",
    "size": "10,500 SQ.FT",
    "image": "/projects/project-2/photo-1.jpeg",
    "venue": "Solitaire Park",
    "style": "Corporate Workplace",
    "photos": [
      "/projects/project-2/photo-1.jpeg",
      "/projects/project-2/photo-2.jpeg",
      "/projects/project-2/photo-3.jpeg",
      "/projects/project-2/photo-4.jpeg"
    ]
  },
  {
    "id": 21,
    "title": "Mr. Hemesh Patel (Chembur)",
    "location": "Chembur",
    "category": "Residential",
    "year": "2021",
    "size": "2,800 SQ.FT",
    "image": "/projects/project-21/photo-1.jpg",
    "venue": "BARC",
    "style": "Modern Interior",
    "photos": [
      "/projects/project-21/photo-1.jpg",
      "/projects/project-21/photo-2.jpg",
      "/projects/project-21/photo-3.png",
      "/projects/project-21/photo-4.png",
      "/projects/project-21/photo-5.png",
      "/projects/project-21/photo-6.png",
      "/projects/project-21/photo-7.png",
      "/projects/project-21/photo-8.png"
    ]
  },
  {
    "id": 12,
    "title": "Kia Showroom (Thane West)",
    "location": "Thane West",
    "category": "Retail",
    "year": "2023",
    "size": "13,000 SQ.FT",
    "image": "/projects/project-12/photo-1.png",
    "style": "Car Showroom",
    "photos": [
      "/projects/project-12/photo-1.png",
      "/projects/project-12/photo-2.png",
      "/projects/project-12/photo-3.png",
      "/projects/project-12/photo-4.png"
    ]
  },
  {
    "id": 13,
    "title": "Kia Showroom (Goa)",
    "location": "Goa",
    "category": "Retail",
    "year": "2023",
    "size": "16,000 SQ.FT",
    "image": "/projects/project-13/photo-2.png",
    "style": "Car Showroom",
    "photos": [
      "/projects/project-13/photo-1.png",
      "/projects/project-13/photo-2.png",
      "/projects/project-13/photo-3.png",
      "/projects/project-13/photo-4.png"
    ]
  },
  {
    "id": 16,
    "title": "Mahindra Meridian – Show Flat (Alibaug)",
    "location": "Alibaug",
    "category": "Residential",
    "year": "2022",
    "size": "5,500 SQ.FT",
    "image": "/projects/project-16/photo-2.jpg",
    "style": "Bali Style Interior",
    "photos": [
      "/projects/project-16/photo-2.jpg",
      "/projects/project-16/photo-4.jpg",
      "/projects/project-16/photo-5.jpg",
      "/projects/project-16/photo-6.png",
      "/projects/project-16/photo-7.jpeg",
      "/projects/project-16/photo-8.jpeg"
    ]
  },
  {
    "id": 17,
    "title": "Mr. Rishikesh Shah (Parel)",
    "location": "Parel",
    "category": "Residential",
    "year": "2023",
    "size": "5,500 SQ.FT",
    "image": "/projects/project-17/photo-1.jpg",
    "style": "Contemporary Interior",
    "photos": [
      "/projects/project-17/photo-1.jpg",
      "/projects/project-17/photo-2.jpg",
      "/projects/project-17/photo-3.jpg",
      "/projects/project-17/photo-4.jpg",
      "/projects/project-17/photo-5.jpg",
      "/projects/project-17/photo-6.jpg",
      "/projects/project-17/photo-7.jpg"
    ]
  },
  {
    "id": 18,
    "title": "Mrs. Nitasha Gaurav (Karjat)",
    "location": "Karjat",
    "category": "Residential",
    "year": "2024",
    "size": "10,000 SQ.FT",
    "image": "/projects/project-18/photo-1.JPG",
    "venue": "Molly Chi Wadi, Dhamni Gaon",
    "style": "Contemporary Interior",
    "photos": [
      "/projects/project-18/photo-1.JPG",
      "/projects/project-18/photo-2.jpg",
      "/projects/project-18/photo-3.jpg"
    ]
  },
  {
    "id": 19,
    "title": "Mr. Jayant Shah (Yeoor)",
    "location": "Yeoor",
    "category": "Residential",
    "year": "2022",
    "size": "4,800 SQ.FT",
    "image": "/projects/project-19/hero.png",
    "style": "Bali Style Interior",
    "photos": [
      "/projects/project-19/hero.png",
      "/projects/project-19/photo-1.png",
      "/projects/project-19/photo-3.png"
    ]
  },
  {
    "id": 4,
    "title": "Jio Credit Ltd. (Bangalore)",
    "location": "Bangalore",
    "category": "Corporate",
    "year": "2022",
    "size": "3,500 SQ.FT",
    "image": "/projects/project-4/photo-4.jpeg",
    "style": "Corporate Workplace",
    "photos": [
      "/projects/project-4/photo-4.jpeg",
      "/projects/project-4/photo-3.jpeg",
      "/projects/project-4/photo-1.jpeg",
      "/projects/project-4/photo-2.jpeg"
    ]
  },
  {
    "id": 5,
    "title": "Mahindra Finance (Hyderabad)",
    "location": "Hyderabad",
    "category": "Corporate",
    "year": "2024",
    "size": "12,000 SQ.FT",
    "image": "/projects/project-5/photo-1.jpeg",
    "style": "Corporate Workplace",
    "photos": [
      "/projects/project-5/photo-1.jpeg"
    ]
  },
  {
    "id": 14,
    "title": "Madanlal Chhaganlal Jewellers (Indore)",
    "location": "Indore",
    "category": "Retail",
    "year": "2021",
    "size": "4,500 SQ.FT",
    "image": "/projects/project-14/photo-1.png",
    "style": "Jewellery Retail",
    "photos": [
      "/projects/project-14/photo-1.png",
      "/projects/project-14/photo-2.jpeg",
      "/projects/project-14/photo-3.jpeg",
      "/projects/project-14/photo-4.jpeg"
    ]
  }
];
