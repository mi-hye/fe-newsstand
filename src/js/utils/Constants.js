"use strict";

export const GRID = Object.freeze({
	cellCount: 24,
	firstPageIdx: 0,
	lastPageIdx: 3,
});

export const VISIBILITY = Object.freeze({
	hidden: "hidden",
	visible: "visible",
});

export const ROLLING = Object.freeze({
	zero: 0,
	newsCount: 5,
	fourSec: 4000,
	fiveSec: 5000,
	firstNewsIdx: 0,
	lastNewsIdx: 4,
});

export const LIST_TAB = [
	"종합/경제",
	"방송/통신",
	"IT",
	"영자지",
	"스포츠/연예",
	"매거진/전문지",
	"지역",
];

export const LIST = Object.freeze({
	firstPageIdx: 0,
	lastPageIdx: (currNews) => currNews.length - 1,
	progressDelay: 6000,
});

export const STATE = Object.freeze({
	grid: "grid",
	list: "list",
	total: "total",
	sub: "sub",
});

export const MODAL = Object.freeze({
	delay: 3000,
});
