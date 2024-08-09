import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Options from "../Options";
import { expect, test } from "vitest";

test("update scoop subtotal when scoop changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoop" />);

  // by default toal is always zero
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla input by 1 and check the sub total
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
