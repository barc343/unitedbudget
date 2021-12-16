import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import BudgetSingleComponent, {BudgetCategories} from "./budget";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders budget category data", async () => {
    const fakeBudgetCategory = {
        name: "BudgetCategory",
        description: "Budget Category Desc",
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeBudgetCategory)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<BudgetCategories />, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});