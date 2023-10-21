'use client'

import { useState } from "react";
import MyFormProvider from "../../components/MyFormProvider";
import TextInput from "../../components/TextInput";
import IRegisterForm, { IRegisterFormResolver } from "../../types/IRegisterForm";

function Page() {
    const [DoPasswordsMatch, SetDoPasswordsMatch] = useState<boolean>(true);
    const values: IRegisterForm = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    };

    const SubmitForm = (formData: IRegisterForm) => {
        if (formData.password !== formData.repeatPassword) {
            SetDoPasswordsMatch(false);
        } else {
            console.log(formData);
        }
    };

    return (
        <>
            <MyFormProvider<IRegisterForm> formResolver={IRegisterFormResolver} defaultValues={values}
                onSubmit={(formData: IRegisterForm) => SubmitForm(formData)} className="mx-auto max-w-[500px]"
            >
                <TextInput name="firstName" label="First Name" placeholder="Type your first name" />
                <TextInput name="lastName" label="Last Name" placeholder="Type your last name" />
                <TextInput name="email" label="Email" placeholder="Type your email" />
                <TextInput name="password" label="Password" placeholder="Type your password" password/>
                <TextInput name="repeatPassword" label="Repeat Password" placeholder="Repeat your password" password/>
                <div className="flex flex-col">
                    {!DoPasswordsMatch && <span className="w-full text-sm font-medium text-red-600">Passwords do not match</span>}
                    <button className="btn btn-active btn-neutral" type="submit">Submit</button>
                </div>
            </MyFormProvider>
        </>
    );
};

export default Page;