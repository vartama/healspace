const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')

async function main() {
  const salt = bcrypt.genSaltSync(10)
  const user = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin', salt),
      fullName: 'Admin',
      gender: 'Male',
      dateOfBirth: '2000-06-29T11:35:19.872Z',
      phoneNumber: '08111111',
    },
  })

  const facilityGym = await prisma.facility.create({
    data: {
      name: 'Gym',
      type: 'gym'
    }
  })

  const facilityBathtub = await prisma.facility.create({
    data: {
      name: 'Bathtub',
      type: 'bathtub'
    }
  })

  const santika = await prisma.hotel.create({
    data: {
      name: "Hotel Santika Premiere ICE - BSD City",
      description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
      phoneNumber: "02180634899",
      rating: 0,
      mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
      location: "BSD",
      lat: "106.63700014090564",
      long: "-6.2986375413492555",
      HotelImage: {
        create: [
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
          },
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
          },
        ],
      },
      HotelRoom: {
        create: [
          {
            name: "Deluxe King",
            description: "Room Information\n28.0 sqm\n2 guests",
            type: "Deluxe King",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 845500,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Executive Suite King",
            description: "Room Information\n44.0 sqm\n2 guests",
            type: "Executive Suite King",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1800-FIT_AND_TRIM-8a89c2152c2e0b44629d67bf1522c032.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 1646500,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Premiere King",
            description: "Room Information\n35.0 sqm\n2 guests",
            type: "Premiere King",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-2000x1333-FIT_AND_TRIM-ffe086eeaaa10857d26799429a8f7140.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 2625500,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          }
        ],
      },
      HotelFacility: {
        create: [
          {
            Facility: {
              connect: {
                id: facilityGym.id,
              },
            },
          },
        ]
      }
    }
  })

  const gaia = await prisma.hotel.create({
    data: {
      name: "The Gaia Hotel Bandung",
      description: "Not only located within easy reach of various places of interests for your adventure, but staying at The Gaia Hotel Bandung will also give you a pleasant stay.\n\nWhether you are planning an event or other special occasions, The Gaia Hotel Bandung is a great choice for you with a large and well-equipped function room to suit your requirements.\n\nThis hotel is the perfect choice for couples seeking a romantic getaway or a honeymoon retreat. Enjoy the most memorable nights with your loved one by staying at The Gaia Hotel Bandung.\n\nSpa treatment is one of the main features of the hotel. Pamper yourself with the relaxing treatment that rejuvenates you.\n\nFrom business event to corporate gathering, The Gaia Hotel Bandung provides complete services and facilities that you and your colleagues need.\n\nHave fun with various entertaining facilities for you and the whole family at The Gaia Hotel Bandung, a wonderful accommodation for your family holiday.\n\nIf you plan to have a long-term stay, staying at The Gaia Hotel Bandung is the right choice for you. Providing wide range of facilities and great service quality, this accommodation certainly makes you feel at home.\n\nThis hotel is the best spot for you who desire a serene and peaceful getaway, far away from the crowds.\n\nThe highest quality service accompanying its extensive facilities will make you get the ultimate holiday experience.\n\nHave an enjoyable and relaxing day at the pool, whether you’re traveling solo or with your loved ones.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from The Gaia Hotel Bandung exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nThe Gaia Hotel Bandung is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at The Gaia Hotel Bandung.",
      phoneNumber: "02220280780",
      rating: 0,
      mainImage: "https://lh5.googleusercontent.com/p/AF1QipMX9xle__DyMH3K-owNO1aGsycjZmWpvos4tGZP=w408-h266-k-no",
      location: "Bandung",
      lat: "107.60074446369724",
      long: "-6.843203186613525",
      HotelImage: {
        create: [
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMX9xle__DyMH3K-owNO1aGsycjZmWpvos4tGZP=w408-h266-k-no",
          },
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMX9xle__DyMH3K-owNO1aGsycjZmWpvos4tGZP=w408-h266-k-no",
          },
        ],
      },
      HotelRoom: {
        create: [
          {
            name: "Deluxe Twin With Balcony Mountain View",
            description: "Room Information\n35.0 sqm\n2 guests",
            type: "Deluxe Twin With Balcony Mountain View",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20053243-63d7240afad285f36def97b1d2e9ff84.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 2780000,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Club King",
            description: "Room Information\n35.0 sqm\n2 guests",
            type: "Club King",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20053243-1babe2c73beac6588ecc01fb9463b637.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 3580000,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          }
        ],
      },
      HotelFacility: {
        create: [
          {
            Facility: {
              connect: {
                id: facilityGym.id,
              },
            },
          },
        ]
      }
    }
  })

  const mulia = await prisma.hotel.create({
    data: {
      name: "Hotel Mulia Senayan, Jakarta",
      description: "From business event to corporate gathering, Hotel Mulia Senayan, Jakarta provides complete services and facilities that you and your colleagues need.\n\nThe highest quality service accompanying its extensive facilities will make you get the ultimate holiday experience.\n\nThe hotel’s fitness center is a must-try during your stay here.\n\nHave an enjoyable and relaxing day at the pool, whether you’re traveling solo or with your loved ones.\n\nGet the best deal for finest quality of spa treatment to unwind and rejuvenate yourself.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Mulia Senayan, Jakarta exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Mulia Senayan, Jakarta is a hotel with great comfort and excellent service according to most hotel's guests.\n\nEnjoy luxurious treats and incomparable experience by staying at Hotel Mulia Senayan, Jakarta.\n\nIn regards to the development of COVID-19, the hotel reserves the right to cancel your reservation upon arriving at the hotel if you have been to the infected territories in the last 14 days or are showing any related symptoms.",
      phoneNumber: "0215747777",
      rating: 0,
      mainImage: "https://lh5.googleusercontent.com/p/AF1QipPIvbj7VZZoWI3rawArlB54ezLBFTlCM4MdshA2=w408-h306-k-no",
      location: "Jakarta",
      lat: "106.79741604884693",
      long: "-6.21477059454932",
      HotelImage: {
        create: [
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPIvbj7VZZoWI3rawArlB54ezLBFTlCM4MdshA2=w408-h306-k-no",
          },
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPIvbj7VZZoWI3rawArlB54ezLBFTlCM4MdshA2=w408-h306-k-no",
          },
        ],
      },
      HotelRoom: {
        create: [
          {
            name: "Advance Purchase Splendor Super Saver",
            description: "Room Information\n48.0 sqm\n2 guests",
            type: "Advance Purchase Splendor Super Saver",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10004732-e83e80eb03b1938abac48f5603af0b74.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 2299000,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Mulia Signature",
            description: "Room Information\n48.0 sqm\n2 guests",
            type: "Mulia Signature",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10004732-32656ad71c77f627c7045c6a39d9adf0.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 3799400,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Executive - Luxury",
            description: "Room Information\n28.0 sqm\n2 guests",
            type: "Executive - Luxury",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10004732-32656ad71c77f627c7045c6a39d9adf0.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 3932499,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      HotelFacility: {
        create: [
          {
            Facility: {
              connect: {
                id: facilityGym.id,
              },
            },
          },
        ]
      }
    }
  })

  const mercure = await prisma.hotel.create({
    data: {
      name: "Mercure Tangerang BSD City",
      description: "Be ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\nHave an enjoyable and relaxing day at the pool, whether you’re traveling solo or with your loved ones.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nMercure Tangerang BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Mercure Tangerang BSD City.",
      phoneNumber: "02150898440",
      rating: 0,
      mainImage: "https://lh5.googleusercontent.com/p/AF1QipOq0QdwG8cPnalFStvzzBl3-e5bSfauUW-JbGtn=w408-h271-k-no",
      location: "BSD",
      lat: "106.64546064884738",
      long: "-6.302315151683677",
      HotelImage: {
        create: [
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOq0QdwG8cPnalFStvzzBl3-e5bSfauUW-JbGtn=w408-h271-k-no",
          },
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOq0QdwG8cPnalFStvzzBl3-e5bSfauUW-JbGtn=w408-h271-k-no",
          },
        ],
      },
      HotelRoom: {
        create: [
          {
            name: "Junior Suite With 1 Double Bed",
            description: "Room Information\n28.0 sqm\n2 guests",
            type: "Junior Suite With 1 Double Bed",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/rvN7CENfvyT2YVqT-7R6UjRIibYDnsWI+-nAv8mJ7GI=/128723/photos/79992678_XL.jpg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 2138001,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Privilege With Double Bed",
            description: "Room Information\n31.0 sqm\n2 guests",
            type: "Privilege With Double Bed",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/rvN7CENfvyT2YVqT-7R6UjRIibYDnsWI+-nAv8mJ7GI=/128723/photos/68180450_XL.jpg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 1638001,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          }
        ],
      },
      HotelFacility: {
        create: [
          {
            Facility: {
              connect: {
                id: facilityGym.id,
              },
            },
          },
        ]
      }
    }
  })

  const anvanya = await prisma.hotel.create({
    data: {
      name: "The Anvaya Beach Resort Bali",
      description: "From business event to corporate gathering, The Anvaya Beach Resort Bali provides complete services and facilities that you and your colleagues need.\n\nThis resort is the best spot for you who desire a serene and peaceful getaway, far away from the crowds.\n\nThe highest quality service accompanying its extensive facilities will make you get the ultimate holiday experience.\n\nThe resort’s fitness center is a must-try during your stay here.\n\nHave an enjoyable and relaxing day at the pool, whether you’re traveling solo or with your loved ones.\n\nGet the best deal for finest quality of spa treatment to unwind and rejuvenate yourself.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from The Anvaya Beach Resort Bali exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nThe Anvaya Beach Resort Bali is a resort with great comfort and excellent service according to most resort's guests.\n\nGet precious and unforgettable moment during your stay at The Anvaya Beach Resort Bali.",
      phoneNumber: "03612090477",
      rating: 0,
      mainImage: "https://lh5.googleusercontent.com/p/AF1QipPv4gymvjEfHLu7m0oDMeeXKB29bFIRWVKzrALb=w408-h272-k-no",
      location: "Bali",
      lat: "115.16602378399834",
      long: "-8.732172439994123",
      HotelImage: {
        create: [
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPv4gymvjEfHLu7m0oDMeeXKB29bFIRWVKzrALb=w408-h272-k-no",
          },
          {
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPv4gymvjEfHLu7m0oDMeeXKB29bFIRWVKzrALb=w408-h272-k-no",
          },
        ],
      },
      HotelRoom: {
        create: [
          {
            name: "Premiere",
            description: "Room Information\n35.0 sqm\n2 guests",
            type: "Premiere",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10016201-67652076ae51b43f050dab0da5f91e4a.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 2983500,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Premiere Suite",
            description: "Room Information\n85.0 sqm\n2 guests",
            type: "Premiere Suite",
            mainImage: "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10016201-a44e43b46459b988cd33252224ca5051.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
            price: 5951084,
            HotelRoomFacility: {
              create: [
                {
                  Facility: {
                    connect: {
                      id: facilityBathtub.id,
                    },
                  },
                },
              ],
            },
          }
        ],
      },
      HotelFacility: {
        create: [
          {
            Facility: {
              connect: {
                id: facilityGym.id,
              },
            },
          },
        ]
      }
    }
  })

  console.log({ gaia })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })