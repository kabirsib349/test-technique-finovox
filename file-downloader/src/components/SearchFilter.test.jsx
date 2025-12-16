import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "./SearchFilter";

//grouper tous les tests relatifs à SearchFilter
describe("SearchFilter Component", () => {
    //définition d'un cas de test  
    it("should call setSearchTerm with the typed value", async () => {
        //Arrange 
        const mockSetSearchTerm = vi.fn();
        const user = userEvent.setup();
        render(
            <SearchFilter 
                searchTerm="" 
                setSearchTerm={mockSetSearchTerm}
                disabled={false}
            />
        );
        const inputElement = screen.getByLabelText("Rechercher des fichiers");
        //Act
        await user.type(inputElement, "test");
        //Assert
        expect(mockSetSearchTerm).toHaveBeenCalledTimes(4);
    });
});
    