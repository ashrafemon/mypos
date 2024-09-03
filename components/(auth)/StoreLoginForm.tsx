"use client";

import { OutletType } from "@/lib/models/Outlet";
import { message } from "@/lib/utils/helper";
import {
    useCreateLogoutMutation,
    useCreateStoreLoginMutation,
    useFetchUserStoresQuery,
} from "@/states/actions/auth";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import AppLoading from "../UI/AppLoading";

const StoreLoginForm = () => {
    const router = useRouter();
    const { data, isFetching, isError, error } = useFetchUserStoresQuery(``);

    const [createLogout, resultLogout] = useCreateLogoutMutation();
    const [createStoreLogin, resultStoreLogin] = useCreateStoreLoginMutation();

    const storeLoginHandler = async (storeId: string | any) => {
        try {
            const payload = await createStoreLogin({
                storeId: storeId,
            }).unwrap();

            message({
                title: payload.message,
                icon: "success",
                timer: 3000,
            });

            router.push("/dashboard");
        } catch (err: { message: string; status: string; data: any } | any) {
            message({
                title: err.message,
                icon: "error",
                timer: 3000,
            });
        }
    };

    const logoutHandler = async () => {
        try {
            const payload = await createLogout(``).unwrap();

            message({
                title: payload.message,
                icon: "success",
                timer: 3000,
            });

            router.push("/login");
        } catch (err: { message: string; status: string; data: any } | any) {
            message({
                title: err.message,
                icon: "error",
                timer: 3000,
            });
        }
    };

    if (isFetching || isError) {
        return (
            <AppLoading
                isLoading={isFetching}
                isError={isError}
                error={error}
            />
        );
    }

    return (
        <Stack gap="sm">
            {data.map((item: OutletType, i: number) => (
                <Button
                    variant="outline"
                    size="lg"
                    key={i}
                    color="black"
                    onClick={() => storeLoginHandler(item.id)}
                >
                    {item.name}
                </Button>
            ))}

            <Button
                color="red"
                size="lg"
                onClick={logoutHandler}
                loading={resultLogout.isLoading}
            >
                Logout
            </Button>
        </Stack>
    );
};

export default StoreLoginForm;
