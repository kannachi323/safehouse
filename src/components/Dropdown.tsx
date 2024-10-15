import { MdOutlineArrowDropDown } from "react-icons/md";

type DropdownProps = {
  label : string
  color: string
}

export default function Dropdown({label, color} : DropdownProps) {
    return (
      <button className={`bg-[#013c6c] inline-flex justify-between items-center p-2 px-10 m-5 border-2 
        border-white rounded-lg text-[${color}] hover:bg-[#18466c]`}
      >
        {label}
        <MdOutlineArrowDropDown className="self-center text-3xl"/>
      </button>
      
        
    )
}