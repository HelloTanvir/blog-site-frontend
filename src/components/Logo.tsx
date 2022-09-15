import Image from 'next/image';

function logo() {
    return <Image src="/logo.svg" width={80} height={40} alt="logo" />;
}

export default logo;
