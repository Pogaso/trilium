import FlexContainer from "../widgets/flex_container.js";
import NoteTitleWidget from "../widgets/note_title.js";
import NoteDetailWidget from "../widgets/note_detail.js";
import NoteTreeWidget from "../widgets/note_tree.js";
import MobileGlobalButtonsWidget from "../widgets/mobile_widgets/mobile_global_buttons.js";
import CloseDetailButtonWidget from "../widgets/mobile_widgets/close_detail_button.js";
import MobileDetailMenuWidget from "../widgets/mobile_widgets/mobile_detail_menu.js";
import ScreenContainer from "../widgets/mobile_widgets/screen_container.js";

const MOBILE_CSS = `
<style>
kbd {
    display: none;
}

.dropdown-menu {
    font-size: larger;
}

.action-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    color: var(--main-text-color);
}
</style>`;

const FANCYTREE_CSS = `
<style>
.tree-wrapper {
    max-height: 100%;
    margin-top: 55px;
    overflow-y: auto;
    contain: content;
}

.fancytree-custom-icon {
    font-size: 2em;
}

.fancytree-title {
    font-size: 1.5em;
    margin-left: 0.6em !important;
}

.fancytree-node {
    padding: 5px;
}

.fancytree-node .fancytree-expander:before {
    font-size: 2em !important;
}

span.fancytree-expander {
    width: 24px !important;
}

.fancytree-loading span.fancytree-expander {
    width: 24px;
    height: 32px;
}

.fancytree-loading  span.fancytree-expander:after {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    border-width: 2px;
    border-style: solid;
}

.tree-wrapper .collapse-tree-button, 
.tree-wrapper .scroll-to-active-note-button, 
.tree-wrapper .tree-settings-button {    
    position: fixed;
    margin-right: 16px;
    display: none;
}
</style>`;

export default class MobileLayout {
    getRootWidget(appContext) {
        return new FlexContainer('row').cssBlock(MOBILE_CSS)
            .setParent(appContext)
            .id('root-widget')
            .css('height', '100vh')
            .child(new ScreenContainer("tree", 'column')
                .class("d-sm-flex d-md-flex d-lg-flex d-xl-flex col-12 col-sm-5 col-md-4 col-lg-4 col-xl-4")
                .css("max-height", "100%")
                .css('padding-left', 0)
                .css('contain', 'content')
                .child(new MobileGlobalButtonsWidget())
                .child(new NoteTreeWidget("main")
                    .cssBlock(FANCYTREE_CSS)))
            .child(new ScreenContainer("detail", "column")
                .class("d-sm-flex d-md-flex d-lg-flex d-xl-flex col-12 col-sm-7 col-md-8 col-lg-8")
                .css('max-height', '100%')
                .child(new FlexContainer('row').overflowing()
                    .css('font-size', 'larger')
                    .css('align-items', 'center')
                    .css('position', 'fixed')
                    .css('top', 0)
                    .child(new MobileDetailMenuWidget())
                    .child(new NoteTitleWidget())
                    .child(new CloseDetailButtonWidget()))
                .child(new NoteDetailWidget()
                    .css('padding', '5px 20px 10px 0')
                    .css('margin-top', '55px')
                    .css('overflow-y', 'auto')
                    .css('contain', 'content')));
    }
}
