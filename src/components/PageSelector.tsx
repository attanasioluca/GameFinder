import {
    Button,
    Flex,
    Spacer,
} from "@chakra-ui/react";

interface Props {
    onSelectedPage: (page: number) => void;
    selectedPage: number;
    resultLen: number;
}

const PageSelector = ({ onSelectedPage, selectedPage, resultLen}: Props) => {
    if(isNaN(selectedPage)){
        selectedPage = 1;
    }
    return (
        <Flex alignItems="center" w="100%" margin="20px 0px 20px 0px">
            <Spacer/>
            {selectedPage>1&& <Button onClick={() => onSelectedPage(--selectedPage)}>-</Button>}
            <Button m="0px 5px 0px 5px">Page {selectedPage}</Button>
            {resultLen == 16 && <Button onClick={() => onSelectedPage(++selectedPage)}>+</Button>}
            <Spacer/>
        </Flex>
    );
};
export default PageSelector;