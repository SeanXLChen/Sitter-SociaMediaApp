import Header from "@/app/components/Header";

export default function UserViewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header showBackArrow label="User Profile" />
            <div >{children}</div>
        </>
    );
}
