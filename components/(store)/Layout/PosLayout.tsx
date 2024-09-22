"use client";

import { LayoutProps } from "@/.next/types/app/layout";
import { message } from "@/lib/utils/helper";
import { useCreateLogoutMutation } from "@/states/actions/auth";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Avatar,
    Box,
    Button,
    Flex,
    Popover,
    Stack,
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

const PosLayout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();

    const [createLogout, resultLogout] = useCreateLogoutMutation();
    const logoutHandler = async () => {
        try {
            const payload = await createLogout(``).unwrap();
            message({
                title: payload.message,
                icon: "success",
                timer: 3000,
            });

            router.replace("/login");
        } catch (err: { message: string; status: string } | any) {
            message({
                title: err.message,
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div className="relative">
            <Flex
                h={{ base: "auto", sm: 60 }}
                className="bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.07)] sticky top-0 z-10"
                align="center"
                justify="space-between"
                gap="xs"
                p="sm"
                direction={{ base: "column", sm: "row" }}
            >
                <Flex gap="xs" align="center">
                    <Tooltip label="Back to Dashboard">
                        <ActionIcon
                            size="lg"
                            variant="light"
                            onClick={() => router.push("/dashboard")}
                        >
                            <Icon icon="humbleicons:dashboard" width={18} />
                        </ActionIcon>
                    </Tooltip>
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="svg-spinners:clock" width={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="quill:stack-alt" width={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="ri:secure-payment-fill" width={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="simple-icons:quicktime" width={18} />
                    </ActionIcon>
                </Flex>

                <Flex gap="sm" align="center">
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="fxemoji:lock" width={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="cil:language" width={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="light">
                        <Icon icon="clarity:notification-solid" width={18} />
                    </ActionIcon>
                    <Popover
                        width={200}
                        position="bottom"
                        withArrow
                        shadow="md"
                    >
                        <Popover.Target>
                            <ActionIcon size="lg" variant="light">
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Stack gap="xs">
                                <Button>Profile</Button>
                                <Button
                                    color="red"
                                    onClick={logoutHandler}
                                    loading={resultLogout.isLoading}
                                >
                                    Logout
                                </Button>
                            </Stack>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Flex>

            <Box mt="md">{children}</Box>
        </div>
    );
};

export default PosLayout;
