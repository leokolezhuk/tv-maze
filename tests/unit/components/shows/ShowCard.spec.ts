import ShowCard from "@/components/shows/ShowCard.vue";
import WrapperLike from "@vue/test-utils/dist/interfaces/wrapperLike";
import Show from "@/models/Show";
import PopoverService from "@/services/popover";
import ShowDetailsModal from "@/components/modals/ShowDetailsModal.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { findElementByTestId, makeSampleShow } from "../../utils";

describe("ShowCard", () => {
  let wrapper: WrapperLike;
  let testShow: Show;

  beforeEach(() => {
    testShow = makeSampleShow("1", ["genre_1", "genre_2"]);
    wrapper = mount(ShowCard, {
      props: {
        show: testShow,
      },
      global: {
        plugins: [createVuetify()],
      },
    });
  });

  it("should show the name of the show", () => {
    expect(wrapper.text()).toContain(testShow.name);
  });

  it("should show the image of the show", () => {
    const image = findElementByTestId(wrapper, "showCardImage");

    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toBe(testShow.image?.medium);
  });

  describe("when mouse is over the card", () => {
    it("should show an overlay with 'Show details'", async () => {
      const cardContainer = findElementByTestId(wrapper, "showCardContainer");
      expect(cardContainer.exists()).toBe(true);
      const cardOverlay = findElementByTestId(wrapper, "showCardOverlay");
      expect(cardOverlay.exists()).toBe(true);
      expect(cardOverlay.isVisible()).toBe(false);

      // When mouse is over, should show the overlay.
      await cardContainer.trigger("mouseover");

      expect(cardOverlay.isVisible()).toBe(true);

      // When mouse leaves, should not show the overlay.
      await cardContainer.trigger("mouseout");

      expect(cardOverlay.isVisible()).toBe(false);
    });
  });

  describe("when the card is clicked on", () => {
    it("should open a popover modal with show details", async () => {
      const popoverOpenSpy = jest
        .spyOn(PopoverService, "open")
        .mockResolvedValue("test-resolved-value");
      const card = findElementByTestId(wrapper, "showCard");
      expect(card.exists()).toBe(true);

      await card.trigger("click");

      expect(popoverOpenSpy).toBeCalledTimes(1);
      expect(popoverOpenSpy).toHaveBeenCalledWith(ShowDetailsModal, {
        show: testShow,
      });
    });
  });
});
