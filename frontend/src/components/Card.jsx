export default function Card({ prodId, prodName, imgSrc, prodPrice }) {
    return (
        <div className="w-full bg-white border-2 border-black p-5 rounded-3xl flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow h-[420px]">
            {/* Top section: Image and Title */}
            <div className="w-full flex flex-col items-center">
                <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                    <img 
                        src={imgSrc || "https://via.placeholder.com/256?text=No+Image"} 
                        alt={`Picture of a ${prodName}`} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-gray-400 text-xs font-semibold mt-4">{`#0${prodId}`}</span>
                <h3 className="font-bold text-base text-center mt-1 px-2 line-clamp-2 text-gray-800">{prodName}</h3>
            </div>
            
            {/* Bottom section: Price */}
            <div className="mt-4">
                <span className="text-lg font-black bg-gray-100 px-4 py-1.5 rounded-full border border-black/10">
                    {`$${prodPrice}`}
                </span>
            </div>
        </div>
    );
}