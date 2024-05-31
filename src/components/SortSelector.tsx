import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
    onSelectSortOrder : (sortOrder: string) => void;
    selectedSortOrder : string;
}

const SortSelector = ({ onSelectSortOrder, selectedSortOrder = "Relevance"} : Props) => {
    const sortOrders = [
        { value: "", label: "Relevance"},
        { value: "added", label: "Date Added"},
        { value: "name", label: "Name"},
        { value: "released", label: "Release Date"},
        { value: "metacritic", label: "Popularity"},
        { value: "rating_top", label: "Average Rating"}
    ];
    return (

        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                Order by: {sortOrders.find(order => order.value === selectedSortOrder)?.label || "Relevance"}
            </MenuButton>
            <MenuList>
                {sortOrders.map((option) => (
                    <MenuItem onClick={() => onSelectSortOrder(option.value)} value={option.value} key={option.value}>{option.label}</MenuItem>
                ))}
            </MenuList>
        </Menu>

    );
};

export default SortSelector;
