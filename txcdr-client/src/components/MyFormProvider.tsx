import { useEffect } from "react";
import { DefaultValues, FieldValues, FormProvider, Resolver, useForm } from "react-hook-form";

interface MyFormProviderProps<IForm extends FieldValues> {
    formResolver: Resolver<any, any>;
    onSubmit: (Data: IForm) => void;
    defaultValues?: DefaultValues<IForm>;
    className?: string;
    isFetched?: boolean;
    children: any;
}

function MyFormProvider<IForm extends FieldValues>(props: MyFormProviderProps<IForm>) {
    const Methods = useForm<IForm>({
        resolver: props.formResolver,
        defaultValues: props.defaultValues
    });
    
    useEffect(() => {
        Methods.reset(props.defaultValues);
    }, [props.isFetched]);

    return (
        <FormProvider {...Methods}>
            <form className={props.className} onSubmit={Methods.handleSubmit(props.onSubmit)}>
                {props.children}
            </form>
        </FormProvider>
    );
};

export default MyFormProvider;