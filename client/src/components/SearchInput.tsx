import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
    onSearch: (searchText: string, searchType: boolean) => void;
    searchType: boolean; // false for games, true for users
}

const SearchInput = ({ onSearch, searchType}: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if (ref.current) onSearch(ref.current.value, searchType);
            }}
        >
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder= {searchType? "Search users...": "Search games..."}
                    variant="filled"
                />
            </InputGroup>
        </form>
    );
};

export default SearchInput;
