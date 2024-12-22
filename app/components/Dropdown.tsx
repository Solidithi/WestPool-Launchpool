import { useState, useRef, useEffect } from "react";
import { availableNetworks } from "../constants";
import useAvailableChain, { AvailableChainState, useProjectBasisStore } from "../zustand/store";

interface CustomDropdownProps {
    className: string;
}

const CustomDropdown = ({ className }: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select a chain");
    const { chain,setChain } = useProjectBasisStore();
    // const setChain = useAvailableChain((state: AvailableChainState) => state.setChain);
    const dropdownRef = useRef<HTMLDivElement>(null);
    

    const options = availableNetworks;

    // const handleOnclick = () => {
    //     console.log(chain);
    // }

    // const options = [
    //     {
    //         value: "ethereum",
    //         label: "Ethereum",
    //         icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
    //     },
    //     {
    //         value: "polygon",
    //         label: "Polygon",
    //         icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=022",
    //     },
    //     {
    //         value: "bsc",
    //         label: "Binance Smart Chain",
    //         icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=022",
    //     },
    // ];


    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Dropdown Toggle */}
            <button
                className={`w-full px-4 py-4 text-left bg-[#f3f3f3] border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none flex items-center ${className}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption !== "Select a chain" ? (
                    <div className="flex items-center">
                        {/* Display selected option image */}
                        <img
                            src={
                                options.find((option) => option.name === selectedOption)?.image ||
                                ""
                            }
                            alt={selectedOption}
                            className="w-6 h-6 mr-2"
                        />
                        {selectedOption}
                    </div>
                ) : (
                    selectedOption
                )}
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-3xl shadow-lg mt-2 z-10">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedOption(option.name);
                                setIsOpen(false);
                                setChain(option.name)
                            }}
                        >
                            <img
                                src={option.image}
                                alt={option.name}
                                className="w-6 h-6 mr-2"
                            />
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
