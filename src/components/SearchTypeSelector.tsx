import { Box, ButtonGroup, HStack, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa"; // User icon from Font Awesome
import { GiGamepad } from "react-icons/gi"; // Gamepad icon from Game Icons

interface Props {
    onChange: () => void;
    currentCheck: boolean; // 0 on games, 1 on users
}

const SearchTypeSelector = ({ onChange, currentCheck }: Props) => {
    return (
        <HStack>
            <ButtonGroup isAttached>
                <IconButton
                    icon={<Icon as={FaUser} />}
                    aria-label={"UserMode"}
                    onClick={onChange}
                    isActive={currentCheck}
                />
                <IconButton
                    icon={<Icon as={GiGamepad} boxSize="24px" />}
                    aria-label={"GameMode"}
                    onClick={onChange}
                    isActive={!currentCheck}
                />
            </ButtonGroup>
        </HStack>
    );
};

export default SearchTypeSelector;
