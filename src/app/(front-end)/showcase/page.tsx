import Image from "next/image"

const amenities = [
  { title: "Private Pool", image: "/resource/private_pool.jpg?height=200&width=300" },
  { title: "Outdoor Event Venue", image: "/resource/outdoor_venue.jpg?height=200&width=300" },
  { title: "Room Accommodations", image: "/resource/room_accommodations.jpg?height=200&width=300" },
  { title: "Videoke Lounge", image: "/resource/videoke_lounge.jpg?height=200&width=300" },
  { title: "Games and Activity Area", image: "/resource/games_area.jpg?height=200&width=300" },
  { title: "Private Pool", image: "/resource/night_private_pool.jpg?height=200&width=300" },
]

export default function ShowCasePage() {
  return (
    <div className='min-h-[calc(100vh-94px)]'>
      <main className="container mx-auto p-4 max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={amenity.image}
                alt={amenity.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white p-2">
                <h3 className="text-sm font-semibold">{amenity.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
