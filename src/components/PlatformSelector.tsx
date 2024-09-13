import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms, { Platform } from "../hooks/usePlatforms";

interface Props {
    onSelectedPlatform: (platform: Platform | null ) => void;
    selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectedPlatform, selectedPlatform }: Props) => {
    const {getPlatforms  } = usePlatforms();
    const {data, error} = getPlatforms();
    if (error) return 
    else if (data){
        return (
            <Menu>
                <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                    {selectedPlatform?.name || "Select Platform"}
                </MenuButton>
                <MenuList>
                <MenuItem
                            onClick={() => onSelectedPlatform(null)}
                            key={"all"}
                        >
                            All platforms
                        </MenuItem>
                    {data.map((platform) => (
                        <MenuItem
                            onClick={() => onSelectedPlatform(platform)}
                            key={platform.id}
                        >
                            {platform.name}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        );
    }
};
export default PlatformSelector;
