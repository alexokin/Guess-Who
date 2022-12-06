"use strict";

const STORAGE_KEY = "guessWhoDB";

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY);

  if (!gQuestsTree) {
    gQuestsTree = createQuest("Male?");
    gQuestsTree.yes = createQuest("Gandhi");
    gQuestsTree.no = createQuest("Rita");
  }

  gCurrQuest = gQuestsTree;
  // gPrevQuest = null;

  _saveQuestsToStorage();
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  // gLastRes gPrevQuest
  var newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gCurrQuest;

  gPrevQuest[lastRes] = newQuest;

  // gCurrQuest = gQuestsTree
  // gPrevQuest = null
  _saveQuestsToStorage();
}

function getCurrQuest() {
  return gCurrQuest;
}

function _saveQuestsToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree);
}
