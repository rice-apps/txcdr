import { useFormContext } from "react-hook-form";

interface TextInputProps {
    name: string;
    label: string;
    placeholder: string;
    password?: boolean;
}

function TextInput(props: TextInputProps) {
    const { watch, setValue } = useFormContext();

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input 
                name={props.name}
                value={watch(props.name)}
                onChange={(e) => setValue(props.name, e.target.value)}
                type={props.password ? "password" : "text"} 
                placeholder={props.placeholder} 
                className="input input-bordered w-full max-w-xs" 
            />
        </div>
    );
};

export default TextInput;