import {AccountingCategory} from "./accountingCategorySlice";
import SouthIcon from '@mui/icons-material/South';
import {v4 as uuidv4} from 'uuid';

const ausgaben: AccountingCategory = {
    id: "1",
    name: "Ausgaben",
    icon: "food",
    description: "Geldausgaben",
    matchers: [],
    parent: null,
    children: null,
    default: true
}

const fixeKosten: AccountingCategory =  {
        id: "2",
        name: "Fixe Kosten",
        icon: 2,
        description: "Geld das beständig ausgegeben wird",
        matchers: [],
        parent: ausgaben,
        children: null,
        default: true
}

export const initialCategories: AccountingCategory[] = [
    {
        id: uuidv4(),
        name: "Fixe Kosten",
        icon: "food",
        description: "Geld das beständig ausgegeben wird",
        matchers: [],
        parent: ausgaben,
        children: null,
        default: true
    },
]
