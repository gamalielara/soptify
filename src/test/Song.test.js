import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Song from "../components/Song/Song";
import store from "../redux/store";

test("Check if the song item is rendered", () => {
  render(
    <Provider store={store}>
      <Song
        title="All Too Well"
        image="https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d"
        album="Red Taylor's Version"
        releaseDate="November 19th"
        link="https://www.google.com"
        isSelected={true}
        isExplicit={true}
        uri={"https://www.google.com"}
      />
    </Provider>
  );

  const songItem = screen.getByText(/All Too Well/i);
  expect(songItem).toBeInTheDocument();
});
