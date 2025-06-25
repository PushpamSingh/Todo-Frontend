export const Button=({
    children,
    type="button",
    bgColor="bg-green-600",
    textColor="text-white",
    classname="",
    myclassname="",
    ...props
}
)=>{
    return (
        <button
        className={myclassname?`${myclassname} ${bgColor} ${textColor}`:`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${classname}`}
        {...props}
        type={type}
        >
            {children}
        </button>
    );
}