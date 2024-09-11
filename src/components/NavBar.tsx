import { Avatar, HStack, Image, Spacer } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

interface Props {
    onSearch?: (searchText: string) => void;
    onPress?: () => void;
    showSearch?: boolean;
}

const NavBar = ({
    onSearch = () => {},
    onPress = () => {},
    showSearch = true,
}: Props) => {
    return (
        <HStack padding="10px">
            <Link to={`/`}>
                <Image src={logo} boxSize="40px" onClick={onPress} />
            </Link>
            {showSearch && <SearchInput onSearch={onSearch} />}
            <Spacer />
            <ColorModeSwitch />
            <Link to={`/account`}>
                <Avatar boxSize="40px" />
            </Link>
        </HStack>
    );
};

export default NavBar;
