import { Avatar, FormControl, FormLabel, HStack, Image, Spacer, Switch } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchTypeSelector from "./SearchTypeSelector";

interface Props {
    onSearch?: (searchText: string, searchType: boolean) => void;
    onPress?: () => void;
    showSearch?: boolean;
}

const NavBar = ({
    onSearch = () => {},
    onPress = () => {},
    showSearch = true,
}: Props) => {

    const [searchType, setSearchType] = useState(false); // false for games, true for users
    return (
        <HStack padding="10px">
            <Link to={`/`}>
                <Image src={logo} boxSize="40px" onClick={onPress} />
            </Link>
            {showSearch && <SearchInput searchType={searchType} onSearch={onSearch} />}
            <SearchTypeSelector currentCheck={searchType} onChange={()=>setSearchType(!searchType)}/>
            <Spacer />
            <ColorModeSwitch />
            <Link to={`/account`}>
                <Avatar boxSize="40px" />
            </Link>
        </HStack>
    );
};

export default NavBar;
