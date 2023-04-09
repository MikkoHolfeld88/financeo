import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import getData, {addAllData} from "../../../services/databaseService/databaseService";
import {FIRESTORE_COLLECTIONS} from "../../../services/databaseService/colletions";
import {initialCategories} from "./initialCategories/initialCategories";
import {STATUS, Status} from "../../../types/general";

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
    status: Status;
    error: string | undefined;
}

const initialState: AccountingCategoryState = {
    categories: [],
    selectedCategory: null,
    status: STATUS.IDLE,
    error: undefined
}

export const postAccountingCategories = createAsyncThunk(
    'accountingCategory/postAccountingCategories',
    async (params: {categories: AccountingCategory[], uid: string}, {rejectWithValue}) => {
        try {
            // removes initialCategories from accountingCategories
            const cleanedAccountingCategories = params.categories.filter(
                (accountingCategory) => !initialCategories.some(
                    (initialCategory) => accountingCategory.id === initialCategory.id));

            addAllData(FIRESTORE_COLLECTIONS.CATEGORIES, params.uid, {categories: cleanedAccountingCategories});
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchAccountingCategories = createAsyncThunk(
    'accountingCategory/fetchAccountingCategories',
    async (uid: string, {rejectWithValue}) => {
        try {
            const documentData = await getData(FIRESTORE_COLLECTIONS.CATEGORIES, uid);
            const individualCategories: AccountingCategory[] = documentData?.categories;

            if (individualCategories && individualCategories.length > 0) {
                return [...initialCategories, ...individualCategories];
            }

            return initialCategories
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

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
            state.categories.sort((a, b) => a.name.localeCompare(b.name));
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
            state.categories.sort((a, b) => a.name.localeCompare(b.name));
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountingCategories.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchAccountingCategories.fulfilled, (state, action: PayloadAction<any>) => {
                state.categories = action.payload;
                state.status = STATUS.SUCCEEDED;
            })
            .addCase(fetchAccountingCategories.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error.message;
            })
    }
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
