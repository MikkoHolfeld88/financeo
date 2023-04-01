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
            state.categories = action.payload;
        },
        addAccountingCategory: (state, action: PayloadAction<AccountingCategory>) => {
            state.categories.push(action.payload);
        },
        editAccountingCategory: (state, action: PayloadAction<AccountingCategory>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    return action.payload;
                }
                return category;
            });
        },
        setSelectedCategory: (state, action: PayloadAction<string | undefined>) => {
            const category = action.payload !== undefined
                ? state.categories.find(category => category.id === action.payload)
                : null;

            if (category) {
                state.selectedCategory = category;
            } else {
                state.selectedCategory = null;
            }
        },
        removeAccountingCategory: (state, action: PayloadAction<AccountingCategory | undefined | null>) => {
            if (action.payload !== undefined && action.payload !== null) {
                state.categories = state.categories.filter(category => category.id !== action?.payload?.id);
            }
        },
        changeName: (state, action: PayloadAction<{category: AccountingCategory, name: string}>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.name = action.payload.name;
                }
                return category;
            });

        },
        changeIcon: (state, action: PayloadAction<{category: AccountingCategory, icon: any}>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.icon = action.payload.icon;
                }
                return category;
            });

        },
        changeDescription: (state, action: PayloadAction<{category: AccountingCategory, description: string}>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.description = action.payload.description;
                }
                return category;
            });

        },
        addMatcher: (state, action: PayloadAction<{category: AccountingCategory, matcher: string}>) => {

            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.matchers = [...category.matchers, action.payload.matcher];
                }
                return category;
            });

        },
        removeMatcher: (state, action: PayloadAction<{category: AccountingCategory, matcher: string}>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.matchers = category.matchers.filter(matcher => matcher !== action.payload.matcher);
                }
                return category;
            });

        },
        addParent: (state, action: PayloadAction<{category: AccountingCategory, parent: AccountingCategory}>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.category.id) {
                    category.parent = action.payload.parent;
                }
                return category;
            });

        },
        removeParent: (state, action: PayloadAction<AccountingCategory>) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    category.parent = null;
                }
                return category;
            });

        },
        resetAccountingCategory: (state) => {
            state.categories = [];
        }
    },
});

export const {
    setAccountingCategories,
    addAccountingCategory,
    setSelectedCategory,
    removeAccountingCategory,
    changeName,
    changeIcon,
    changeDescription,
    addMatcher,
    removeMatcher,
    addParent,
    removeParent,
    resetAccountingCategory,
    editAccountingCategory
} = accountingCategorySlice.actions;

export default accountingCategorySlice.reducer;
