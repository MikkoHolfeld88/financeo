import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AccountingCategory {
    id?: string,
    name: string,
    icon: any,
    description?: string,
    matchers: string[],
    parent?: AccountingCategory | AccountingCategory[] | null,
    default: boolean,
}

interface AccountingCategoryState {
    categories: AccountingCategory[];
    selectedCategory: AccountingCategory | null;
    status: 'idle' | 'pending' | 'loaded' | 'failed';
}

const initialState: AccountingCategoryState = {
    categories: [],
    selectedCategory: null,
    status: 'idle'
}

export const accountingCategorySlice = createSlice({
    name: 'accountingCategory',
    initialState,
    reducers: {
        setAccountingCategories: (state, action: PayloadAction<AccountingCategory[]>) => {
            state.status = 'pending';
            state.categories = action.payload;
            state.status = 'loaded';
        },
        addAccountingCategory: (state, action: PayloadAction<AccountingCategory>) => {
            state.status = 'pending';
            state.categories.push(action.payload);
            state.status = 'loaded';
        },
        removeAccountingCategory: (state, action: PayloadAction<AccountingCategory>) => {
            state.status = 'pending';
            state.categories = state.categories.filter(category => category.id !== action.payload.id);
            state.status = 'loaded';
        },
        changeName: (state, action: PayloadAction<{category: AccountingCategory, name: string}>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.name = action.payload.name;
                }
                return category;
            });
            state.status = 'loaded';
        },
        changeIcon: (state, action: PayloadAction<{category: AccountingCategory, icon: any}>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.icon = action.payload.icon;
                }
                return category;
            });
            state.status = 'loaded';
        },
        changeDescription: (state, action: PayloadAction<{category: AccountingCategory, description: string}>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.description = action.payload.description;
                }
                return category;
            });
            state.status = 'loaded';
        },
        addMatcher: (state, action: PayloadAction<{category: AccountingCategory, matcher: string}>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.matchers = [...category.matchers, action.payload.matcher];
                }
                return category;
            });
            state.status = 'loaded';
        },
        removeMatcher: (state, action: PayloadAction<{category: AccountingCategory, matcher: string}>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.matchers = category.matchers.filter(matcher => matcher !== action.payload.matcher);
                }
                return category;
            });
            state.status = 'loaded';
        },
        addParent: (state, action: PayloadAction<{category: AccountingCategory, parent: AccountingCategory}>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.parent = action.payload.parent;
                }
                return category;
            });
            state.status = 'loaded';
        },
        removeParent: (state, action: PayloadAction<AccountingCategory>) => {
            state.status = 'pending';
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    category.parent = null;
                }
                return category;
            });
            state.status = 'loaded';
        },
        resetAccountingCategory: (state) => {
            state.categories = [];
            state.status = 'idle';
        }
    },
});

export const {
    setAccountingCategories,
    addAccountingCategory,
    removeAccountingCategory,
    changeName,
    changeIcon,
    changeDescription,
    addMatcher,
    removeMatcher,
    addParent,
    removeParent,
    resetAccountingCategory
} = accountingCategorySlice.actions;

export default accountingCategorySlice.reducer;
