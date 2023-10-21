'use client'

import MyFormProvider from "../../components/MyFormProvider";
import TextInput from "../../components/TextInput";
import ILoginForm, { ILoginFormResolver } from "../../types/ILoginForm";


function Page() {
    const values: ILoginForm = {
        email: "",
        password: ""
    };

    return (
        <>
            <MyFormProvider<ILoginForm> formResolver={ILoginFormResolver} defaultValues={values}
                onSubmit={(formData: ILoginForm) => console.log(formData)} className="mx-auto max-w-[500px]"
            >
                <TextInput name="email" label="Email" placeholder="Type your email" />
                <TextInput name="password" label="Password" placeholder="Type your password" password/>
                <button className="btn btn-active btn-neutral" type="submit">Submit</button>
            </MyFormProvider>
        </>
    );
};

export default Page;