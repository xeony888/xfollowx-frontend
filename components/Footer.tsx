

export default function Footer() {
    return (
        <div className="bg-[#161616] flex flex-col justify-center items-center w-full px-10">
            <div className="flex flex-row justify-between items-center w-full py-6">
                <div className="flex flex-row justify-center items-center gap-10">
                    <img src="/logo.png" className="w-8 md:w-10 lg:w-16" />
                    <p className="text-xs md:text-base">Whitepaper</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-5">
                    <p className="text-xs md:text-base">Follow Us</p>
                    <img src="/x.png" className="w-5" />
                    <img src="/discord.png" className="w-5" />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-screen border-t-[1px] border-t-gray-500 py-1">
                <p className="text-gray-500 text-xs md:text-base">© 2024 GOTM Labz - All Rights Reserved.</p>
            </div>
        </div>
    );
}