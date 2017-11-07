/**
 * -----------------------------------------------------
 * Created by uforgot on 2017. 10. 12.
 * zanybros
 * -----------------------------------------------------
 */

export const UtilsData = {

    getWorksDatafromJson: function ($data) {
        let returnArray = [];
        let tmpNode = $data.data.contentsData;
        let i, j, k, l;

        for (i = 0; i < tmpNode.length; i++) {

            if (!tmpNode[i]) {
                continue;
            }
            if (!tmpNode[i].hasOwnProperty('contents')) {
                continue;
            }

            let tmpNode3 = tmpNode[i].contents;

            for (k = 0; k < tmpNode3.length; k++) {
                let tmpNode4 = tmpNode3[k];

                if (tmpNode4.component === 'view-works-holder') {
                    let tmpNode5 = tmpNode4.data.content;

                    for (l = 0; l < tmpNode5.length; l++) {
                        let tmpNode6 = tmpNode5[l];

                        if (tmpNode6.component === 'content-works-item') {
                            returnArray.push(tmpNode6);
                        }

                    }
                }
            }
        }

        return returnArray;
    },

    getTitleArray: function ($data) {
        let returnArray = [];
        let tmpNode = $data.data.contentsData;
        let i;

        for (i = 0; i < tmpNode.length; i++) {
            returnArray.push(this.getAnchorArrayInContents(tmpNode[i]));
        }
        return returnArray;
    },

    getAnchorArrayInContents: function ($data) {
        let i;
        let returnArray = [];

        for (i = 0; i < $data.contents.length; i++) {
            let tmpData = $data.contents[i];
            if (tmpData.component === 'view-content-anchor') {
                returnArray.push(
                    {
                        menu: tmpData.data.menu,
                        anchor: tmpData.data.anchor
                    }
                );
            }
        }
        return returnArray;
    }

};