"use client";

import CollapseLink from "@/components/UI/CollapseLink";
import Images from "@/lib/constants/Images";
import { StoreLinks } from "@/lib/constants/Links";
import { LayoutType } from "@/lib/types/types";
import { message } from "@/lib/utils/helper";
import { useCreateLogoutMutation } from "@/states/actions/auth";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    AppShell,
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Popover,
    ScrollArea,
    Stack,
    Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const StoreLayout: React.FC<LayoutType> = ({ children }) => {
    const router = useRouter();
    const [opened, { toggle }] = useDisclosure(true);
    const matches = useMediaQuery("(max-width: 48em)");

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
        <AppShell
            navbar={{
                width: opened ? 250 : 0,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Navbar maw={250} className="bg-secondary">
                <Box h={60} className="bg-white/20 relative">
                    <Flex
                        align="center"
                        h="100%"
                        justify="space-between"
                        p="xs"
                    >
                        <Image
                            src={Images.Logo}
                            alt="Logo"
                            width={150}
                            height={35}
                        />
                    </Flex>

                    {matches && opened && (
                        <ActionIcon
                            radius="lg"
                            color="red"
                            className="absolute top-4 -right-3"
                            onClick={toggle}
                        >
                            <Icon icon="ion:close" />
                        </ActionIcon>
                    )}
                </Box>

                <ScrollArea p="md">
                    <Flex direction="column" rowGap="xs">
                        {StoreLinks.map((item, i) => (
                            <CollapseLink
                                key={i}
                                name={item.name}
                                icon={item.icon}
                                link={item.link}
                                links={item.links}
                                clickFunc={matches ? toggle : () => {}}
                            />
                        ))}
                    </Flex>
                </ScrollArea>
            </AppShell.Navbar>

            <AppShell.Main>
                <Flex
                    h={{ base: "auto", sm: 60 }}
                    className="bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.07)]"
                    align="center"
                    justify="space-between"
                    gap="xs"
                    p="sm"
                    direction={{ base: "column", sm: "row" }}
                >
                    <Flex gap="xs" align="center">
                        <ActionIcon size="lg" variant="light" onClick={toggle}>
                            <Icon
                                icon={
                                    !opened
                                        ? "mdi:hamburger-close"
                                        : "mdi:hamburger-open"
                                }
                                width={18}
                            />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="mdi:point-of-sale" width={18} />
                        </ActionIcon>
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
                            <Icon
                                icon="clarity:notification-solid"
                                width={18}
                            />
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

                <Box p="md" pb="xl" mb="xl">
                    {children}
                </Box>
            </AppShell.Main>
            <AppShell.Footer className="py-2">
                <Center>
                    <Text size="xs">by Asl Software LTD. Copyright @MYPOS</Text>
                </Center>
            </AppShell.Footer>
        </AppShell>
    );
};

export default StoreLayout;
