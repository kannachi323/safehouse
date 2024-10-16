import { MdOutlineArrowDropDown } from "react-icons/md";

type DropdownProps = {
  label : string
  color: string
}

export default function Dropdown({label, color} : DropdownProps) {
    return (
      <button className={`bg-white flex flex-row justify-between items-center border-2 w-56 h-8
        border-white rounded-lg text-[${color}] text-2xl px-2 text-[#9fa3b5]`}
      >
        {label}
        <MdOutlineArrowDropDown className="self-center text-4xl"/>
      </button>
      
  
    )
} 