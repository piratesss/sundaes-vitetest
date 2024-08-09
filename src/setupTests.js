import "@testing-library/jest-dom";
// change!
import { beforeAll, afterEach, afterAll } from "vitest";

import { server } from "./mocks/server";

// Establishing API mocking
beforeAll(() => server.listen());

// Reset any reset handlers we add duiring the test so that
//they don't  affect other tests
afterEach(() => server.resetHandlers());

//Clean up after the tests are finished
afterAll(() => server.close());
