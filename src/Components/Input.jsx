import React, { useId } from "react";

export const Input=React.forwardRef(({
    type="text",
    label,
    classname="",
    myclassname="",
    labelClass="",
    placeholder="Enter your Input",
    ...props
},ref)=>{
    const id=useId();

    return (
        <div className="w-full">
            {
                label && (
                    <label className={`inline-block pl-1 mb-1 ${labelClass}`}
                    htmlFor={id}
                    >
                        {label}
                    </label>
                )
            }
            <input
            type={type}
            placeholder={placeholder}
            className={myclassname ?`${myclassname}`:`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
            id={id}
            {...props}
            autoComplete="on"
            ref={ref}
            />
            
        </div>
    )

})