import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";

import Page from "@/app/(auth)/dashboard/page";

beforeAll(() => {
	render(<Page />);
});

describe("Dashboard page", () => {
	it("should render", () => {
		expect(screen.getByText("Open Rate")).toBeDefined();
	});

	it("should render email statistics heading", () => {
		expect(
			screen.getByRole("heading", { level: 3, name: "Email Statistics" }),
		).toBeDefined();
	});
});
