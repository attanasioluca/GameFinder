import { Platform } from "../hooks/usePlatforms";
import { HStack, Icon, Text } from "@chakra-ui/react";
import {
    FaWindows,
    FaPlaystation,
    FaXbox,
    FaApple,
    FaLinux,
    FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

interface Props {
    platforms: {platform: Platform}[];
}

const PlatformIconList = ({ platforms }: Props) => {
    const iconMap: { [key: string]: IconType } = {
        pc: FaWindows,
        playstation: FaPlaystation,
        xbox: FaXbox,
        nintendo: SiNintendo,
        mac: FaApple,
        linux: FaLinux,
        ios: MdPhoneIphone,
        web: BsGlobe,
        android: FaAndroid,
    };

    return (
        <HStack marginTop={1}>
            {platforms.map((platform) => (
                <Icon key={platform.platform.slug} as={iconMap[platform.platform.slug]} color="gray.500" />
            ))}
        </HStack>
    );
};
export default PlatformIconList;
