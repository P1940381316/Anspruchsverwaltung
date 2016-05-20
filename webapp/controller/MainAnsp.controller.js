sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../sonstiges/CustomerFormat",
	"sap/m/MessageToast"
], function(jQuery, Controller, JSONModel, CustomerFormat, MessageToast) {
	"use strict";

	return Controller.extend("com.convista.controller.MainAnsp", {
		modelNavi: new sap.ui.model.json.JSONModel("model/Basiscs.json"),

		onInit: function() {

			this.getView().setModel(this.modelNavi);
			//	this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
			this.initCustomFormat();

			this.onSideNavButtonPress();

			this.initializeOpenItems("Aktuell");
			this.showOpenItems();
		
			this.initializeChangeEstimation("Aktuell");
			this.showChangeEstimation();


			//Hide Settings Panel for phone
			if (sap.ui.Device.system.phone) {
				this.getView().byId("settingsPanel").setExpanded(false);
			}
		},
        generateVizFrame : function () {
            var oVizFrameKompl1;
			// Stacked bar chart vizframe
			oVizFrameKompl1 = new sap.viz.ui5.controls.VizFrame({
				height: "100%",
				width: "100%",
				uiConfig: {
					applicationSet: "fiori"
				},
				vizProperties: {
					plotArea: {
						dataLabel: {
							formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
							visible: true
						}
					},
					legend: {
						"visible": true
					},
					title: {
						"visible": false
					},
					categoryAxis: {
						title: {
							"visible": false
						}
					},
					valueAxis: {
						label: {
							formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2
						},
						title: {

							"visible": false
						}
					}
				}
			});
			return oVizFrameKompl1;
        },    
        
		/**
		 *  OpenItem 
		 *  timeRange: Bereich der Auswahl
		 */
		initializeOpenItems: function(timeRange) {
			var oVizFrameKompl1,
				oModelKompl1,
				oDatasetKompl1,
				oFeedAxisLabelsKompl1;
			// Stacked bar chart vizframe
			oVizFrameKompl1 = this.generateVizFrame();

			oModelKompl1 = new sap.ui.model.json.JSONModel("model/OpenItems.json");
			var panelKompl = this.getView().byId("panelOpenItems");
			panelKompl.setModel(oModelKompl1);
			oDatasetKompl1 = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "KPI",
					value: "{KPI}"
				}],
				measures: [{
					name: "Offene Posten Total",
					value: "{OpenItemsTotal}"
				}, {
					name: "Offene Posten Prämien",
					value: "{OpenItemsBonus}"
				}, {
					name: "Offene Posten Nebenforderungen",
					value: "{OpenItemsAllowance}"
				}],
				data: {
					path: "/OpenItemsByCC/" + timeRange
				}
			});

			var oFeedPrimaryValuesKompl1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: ["Offene Posten Total"]
			});

			var oFeedPrimaryValuesKompl2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: ["Offene Posten Prämien"]
			});
			var oFeedPrimaryValuesKompl3 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: ["Offene Posten Nebenforderungen"]
			});
			oFeedAxisLabelsKompl1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["KPI"]
			});

			oVizFrameKompl1.setDataset(oDatasetKompl1);
			oVizFrameKompl1.setModel(oModelKompl1);
			oVizFrameKompl1.addFeed(oFeedPrimaryValuesKompl1);
			oVizFrameKompl1.addFeed(oFeedPrimaryValuesKompl2);
			oVizFrameKompl1.addFeed(oFeedPrimaryValuesKompl3);
			oVizFrameKompl1.addFeed(oFeedAxisLabelsKompl1);
			oVizFrameKompl1.setVizType("column");
			this._oVizFrameKompl1 = oVizFrameKompl1;
		},
		showOpenItems: function() {
			var oChartContainer,
				oContent1;

			oChartContainer = this.getView().byId("idChartContainerOutstanding");
			oContent1 = new sap.suite.ui.commons.ChartContainerContent({
				icon: "sap-icon://Bar-chart",
				title: "Bar Chart"
			});
			oContent1.setContent(this._oVizFrameKompl1);
			oChartContainer.removeAllContent();
			oChartContainer.addContent(oContent1);
			oChartContainer.updateChartContainer();
		},
		
		/**
		 *  
		 *  @param: timeRange {string} Bereich der Auswahl
		 *  ChangeEstimation
		 */
		initializeChangeEstimation: function(timeRange) {
			var oVizFrameKompl1,
				oModelKompl1,
				oDatasetKompl1,
				oFeedAxisLabelsKompl1;
			// Stacked bar chart vizframe
			oVizFrameKompl1 = this.generateVizFrame();

			oModelKompl1 = new sap.ui.model.json.JSONModel("model/OpenItems.json");
			var panelKompl = this.getView().byId("panelSollstellungen");
			panelKompl.setModel(oModelKompl1);
			oDatasetKompl1 = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "KPI",
					value: "{KPI}"
				}],
				measures: [{
					name: "Sollstellungen Total",
					value: "{ChangeEstimationTotal}"
				}, {
					name: "Sollstellungen Prämien",
					value: "{ChangeEstimationBonus}"
				}, {
					name: "Sollstellungen Nebenforderungen",
					value: "{ChangeEstimationAllowance}"
				}],
				data: {
					path: "/ChangeEstimationCC/" + timeRange
				}
			});

			var oFeedPrimaryValuesKompl1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: ["Sollstellungen Total"]
			});

			var oFeedPrimaryValuesKompl2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: ["Sollstellungen Prämien"]
			});
			var oFeedPrimaryValuesKompl3 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: ["Sollstellungen Nebenforderungen"]
			});
			oFeedAxisLabelsKompl1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["KPI"]
			});

			oVizFrameKompl1.setDataset(oDatasetKompl1);
			oVizFrameKompl1.setModel(oModelKompl1);
			oVizFrameKompl1.addFeed(oFeedPrimaryValuesKompl1);
			oVizFrameKompl1.addFeed(oFeedPrimaryValuesKompl2);
			oVizFrameKompl1.addFeed(oFeedPrimaryValuesKompl3);
			oVizFrameKompl1.addFeed(oFeedAxisLabelsKompl1);
			oVizFrameKompl1.setVizType("column");
			this._oVizFrameKompl1 = oVizFrameKompl1;
		},
		showChangeEstimation  : function() {
			var oChartContainer,
				oContent1;

			oChartContainer = this.getView().byId("idChartContainerEstimation");
			oContent1 = new sap.suite.ui.commons.ChartContainerContent({
				icon: "sap-icon://Bar-chart",
				title: "Bar Chart"
			});
			oContent1.setContent(this._oVizFrameKompl1);
			oChartContainer.removeAllContent();
			oChartContainer.addContent(oContent1);
			oChartContainer.updateChartContainer();
		},

		onSideNavButtonPress: function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			//	var sideExpanded = toolPage.getSideExpanded();
			//	this._setToggleButtonTooltip(sideExpanded);
			//	toolPage.setSideExpanded(!toolPage.getSideExpanded());
			// setze auf immer geschlossen
			toolPage.setSideExpanded(false);
		},
		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter("item");
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},
		initCustomFormat: function() {
			CustomerFormat.registerCustomFormat();
		},

		number1formater: function(value1) {
			var oNumerFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
				maxFractionDigits: 2,
				groupingEnabled: true,
				groupingSeparator: ".",
				decimalSeparator: ","
			});
			//return CustomerFormat.FIORI_LABEL_FORMAT_2.format(value1);
			return oNumerFormat.format(value1);
		},

		handleSelectionChangeOutstanding: function(oEvent) {
			var oItem = oEvent.getParameter("selectedItem");
			this.initializeOpenItems(oItem.getText());
			this.showOpenItems();
    	},
    	
    	handleSelectionChangeEstimation : function (oEvent) {
    	    var oItem = oEvent.getParameter("selectedItem");
			this.initializeChangeEstimation(oItem.getText());
			this.showChangeEstimation();
    	}
	});

});