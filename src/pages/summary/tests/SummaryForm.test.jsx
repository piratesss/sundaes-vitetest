import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import SummaryForm from "../SummaryForm";

test("Initial Condition", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on the first click and disabbles on the second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  //pop over is not visible by default
  const nullPopver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopver).not.toBeInTheDocument();

  //pop over appears on mouse enter checkbox label

  const termsAndCondition = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndCondition);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappear when we exitt

  await user.unhover(termsAndCondition);
  expect(nullPopver).not.toBeInTheDocument();
});
