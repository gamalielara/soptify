import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import store from "../redux/store";
import { dummyData } from "./dummy";
import SearchDummyTrack from "./searchDummyTrack";

const getTracks = rest.get("/tracks", (req, res, ctx) => {
  return res(ctx.json(dummyData));
});

const server = setupServer(getTracks);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("The song lists should appear", async () => {
  render(
    <Provider store={store}>
      <SearchDummyTrack />
    </Provider>
  );

  const button = screen.getByText("Search");
  userEvent.click(button);
  await screen.findAllByText("All Too Well");

  const track = screen.getByTitle("section-container");
  expect(track).toBeInTheDocument();
});
