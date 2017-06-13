function getTotalsHtml(number){
    var total_html = number.toString();
    if(total_html.length <= 4){
        total_html = "<span class='small_price'>"+numberWithCommas(number)+"</span><span class='unit_price'>만원</span>";        
    }else{
        total_html = "<span class='big_price'>"+numberWithCommas(total_html.substring(0, total_html.length-4))+ "</span><span class='unit_price'>억</span>"
            + "<span class='small_price'>"+numberWithCommas(total_html.substring(total_html.length-4))+ "</span><span class='unit_price'>만원</span></span>";
    }
    return total_html;
}

function getFluctuatesHtml(number){
    if(number==0){
        return "-";
    }else{
        var fluctuates_html = number.toString();
        var fron_span ="<div class='up_price'><div class='arrow_price'>&#x2191</div>";
        var back_span ="만원</div>";
        
        if(-1 < fluctuates_html.indexOf('-')){
            fron_span = "<div class='down_price'><div class='arrow_price'>&#x2193</div>";
            fluctuates_html = fluctuates_html.replace("-","");
        }
        
        if(4 < fluctuates_html.length){
            fluctuates_html = fluctuates_html.substring(0, fluctuates_html.length-4);
            back_span ="억원</div>";
        }
        
        fluctuates_html = numberWithCommas(fluctuates_html);
        if(Number(fluctuates_html)==0){
            fluctuates_html = 1;
        }
        return fron_span + "<span style='font-family:mark-pro !important'>"+fluctuates_html + "</span>" +back_span;
    }
}

function getOfficerHtml(id, organization, division, job_title, name, totals, fluctuates){
    var row = "<tr class='cur_po'>";
    row += "<td class='hidden'>"+id+"</td>";
    row +="<td class='col-sm-4'><div class='official_title'>"+name+"</div><div class='official_text'>"+job_title+"</div><div class='official_text'>"+division+"</div></td>";
    row +="<td class='col-sm-4'><div class='totals_text'>총액</div>"+getTotalsHtml(convertUnit(totals))+"</td>";
    row +="<td class='col-sm-4'><div class='totals_text'>전년도 대비</div>"+getFluctuatesHtml(convertUnit(fluctuates))+"</td>";
    row += "</tr>";
    return row;
}

function getOfficersHtml(id, organization, division, job_title, name, totals, fluctuates){
    var row = "<tr class='cur_po'>";
    row += "<td class='hidden'>"+id+"</td>";
    row +="<td class='col-sm-4 officer_table_td'><div class='chart_official'>"+name+"</div><div class='chart_official_sub'>"+job_title+"</div><div class='chart_official_sub'>"+division+"</div></td>";
    row +="<td class='col-sm-4 officer_table_td'>"+getOfficerTotalsHtml(convertUnit(totals))+"</td>";
    row +="<td class='col-sm-4 officer_table_td'>"+getFluctuatesHtml(convertUnit(fluctuates))+"</td>";
    row += "</tr>";
    return row;
}

function getOfficerTotalsHtml(number){
    var total_html = number.toString();
    if(total_html.length <= 4){
        total_html = "<span class='chart_totals'>"+numberWithCommas(number)+"</span><span class='unit_price'>만원</span>";        
    }else{
        total_html = "<span class='chart_totals'>"+numberWithCommas(total_html.substring(0, total_html.length-4))+ "</span><span class='chart_totals_unit'>억 </span>"
            + "<span class='chart_totals_sub'>"+numberWithCommas(total_html.substring(total_html.length-4))+ "</span><span class='chart_totals_unit'>만원</span></span>";
    }
    return total_html;
}

// function getOfficerFluctuatesHtml(number){
//     if(number==0){
//         return "-";
//     }else{
//         var fluctuates_html = number.toString();
//         var fron_span ="<div class='chart_up_unit'><span class='chart_up'>&#x2191</span>";
//         var back_span ="만원</div>";
        
//         if(-1 < fluctuates_html.indexOf('-')){
//             fron_span = "<div class='chart_down_unit'><span class='chart_down'>&#x2193</span>";
//             fluctuates_html = fluctuates_html.replace("-","");
//         }
        
//         if(4 < fluctuates_html.length){
//             fluctuates_html = fluctuates_html.substring(0, fluctuates_html.length-4);
//             back_span ="억원</div>";
//         }
        
//         fluctuates_html = numberWithCommas(fluctuates_html);
//         if(Number(fluctuates_html)==0){
//             fluctuates_html = 1;
//         }
//         return fron_span + "<span style='font-family:mark-pro !important'>"+fluctuates_html + "</span>" +back_span;
//     }
// }


function getMainOfficerHtmlByMobile(id, organization, division, job_title, name, totals, fluctuates){
    var row='<div class="officer_row"><div class="row"><div class="col-xs-7 text-left">';
    row += '<div class="official_title">'+name+'</div>';
    row += '<div class="official_text">'+organization+'</div>';
    row += '<div class="official_text">'+job_title+'</div></div>';
    row += '<div class="col-xs-5 text-right">'+getFluctuatesHtml(convertUnit(fluctuates))+'</div></div>';
    row += '<div class="official_totals row"><div class="col-xs-12 text-left">'+getTotalsHtml(convertUnit(totals));
    row += '</div></div><div class="row"><div id="main_chart_'+id+'"></div></div></div>';
    return row;
}

function getOfficerHtmlByMobile(id, organization, division, job_title, name, totals, fluctuates){
    var row='<tr><td class="hidden">'+id+'</td>';
    row += '<td class="col-xs-7 text-left"><div class="official_title">'+name+'</div>';
    row += '<div class="official_text">'+organization+'</div>';
    row += '<div class="official_text">'+job_title+'</div></td>';
    row += '<td class="col-xs-5 text-right">'+getFluctuatesHtml(convertUnit(fluctuates))+'</div></td>';
    row += '<tr class="official_totals"><td colspan="3" class="padding-top-35 margin-bottom-15 col-xs-12 text-left">'+getTotalsHtml(convertUnit(totals))+'</td></tr>';
    return row; 
}

function getEmptyRowHtml(cols){
    var row = "<tr>";
    row += "<td colspan="+cols+" class='no_data'>검색 결과가 없습니다.</td>";
    row += "</tr>";
    return row;
}

function getEmptyRowHtml(){
    var row = "<div class='col-xs-12 no_data'>검색 결과가 없습니다.</div>";
    return row;
}

function getSelectRowHtml(cols){
    var row = "<tr>";
    row += "<td colspan="+cols+" class='no_data'>검색결과를 선택해주세요.</td>";
    row += "</tr>";
    return row;
}

function getSelectedOfficerHtml(organization, division, job_title, name, total, fluctuate){
    var row = "<tr>";
    row +="<td class='col-sm-4'><div class='official_title'>"+name+"</div><div class='official_text'>"+job_title+"</div><div class='official_text'>"+division+"</div></td>";
    row +="<td class='col-sm-4'>"+total+"</td>";
    row +="<td class='col-sm-4'>"+fluctuate+"</td>";
    row += "</tr>";
    return row;
}

function getSelectedOfficerHtmlByMobile(organization, division, job_title, name, totals, fluctuates){
    var row='<tr><td class="col-xs-7 text-left"><div class="official_title">'+name+'</div>';
    row += '<div class="official_text">'+organization+'</div>';
    row += '<div class="official_text">'+job_title+'</div></td>';
    row += '<td class="col-xs-5 text-right">'+fluctuates+'</div></td>';
    row += '<tr class="official_totals"><td colspan="3" class="padding-top-35 margin-bottom-15 col-xs-12 text-left">'+totals+'</td></tr>';
    return row;
}

function getSimpleTotalHtml(number){
    var symbol="";
    if(number<0){
        symbol = "-";
        number = Math.abs(number);
    }
    var total_html = number.toString();
    if(total_html.length <= 4){
        total_html = "<span class='simple_price'>"+numberWithCommas(total_html)+"</span><span class='simple_unit_price'>만원</span>";        
    }else{
        total_html = "<span class='simple_price'>"+numberWithCommas(total_html.substring(0, total_html.length-4))+ "</span><span class='simple_unit_price'>억</span>";
    }
    return symbol+total_html;
}

function getTotalText(number){
    var symbol="";
    if(number<0){
        symbol = "-";
        number = Math.abs(number);
    }
    var total_html = number.toString();
    if(total_html.length <= 4){
        total_html = numberWithCommas(total_html)+"만원";        
    }else{
        total_html = numberWithCommas(total_html.substring(0, total_html.length-4))+ "억원";
    }
    return symbol+total_html;
}


function getAssetDataHtml(tengible_estate_assets, tengible_assets, financial_assets, liability_assets){
    var previous_price = 0;
    var present_price = 0;
    var row = ""
    
    var previous_price_building = 0;
    var present_price_building = 0;
    var previous_price_land = 0;
    var present_price_land = 0;
    var hasBuilding = false;
    var hasLand = false;
    
    for(var i=0; i<tengible_estate_assets.length;i++){
        if(tengible_estate_assets.category == 11){
            hasBuilding = true;
            previous_price_building += tengible_estate_assets[i].previous_price;
            present_price_building += tengible_estate_assets[i].present_price;            
        }else{
            hasLand = true;
            previous_price_land += tengible_estate_assets[i].previous_price;
            present_price_land += tengible_estate_assets[i].present_price;
        }
    }
    
    row +="<tr>";
    row +="<td class='col-sm-4 text-left'>건물</td>";
    var nodata_row = "<td class='col-sm-3 text-left'>-</td><td class='col-sm-3 text-left'>-</td><td class='col-sm-2 text-right'>-</td>";
    if(hasBuilding){
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((previous_price_building))+"</td>";
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((present_price_building))+"</td>";
        row +="<td class='col-sm-2 text-right'>"+getFluctuatesHtml((present_price_building-previous_price_building))+"</td>";    
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    row +="<tr>";
    row +="<td class='col-sm-4 text-left'>토지</td>";
    if(hasLand){
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((previous_price_land))+"</td>";
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((present_price_land))+"</td>";
        row +="<td class='col-sm-2 text-right'>"+getFluctuatesHtml((present_price_land-previous_price_land))+"</td>";    
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    previous_price = 0;
    present_price = 0;
    row +="<tr>";
    row +="<td class='col-sm-4 text-left'>자동차 등</td>";
    if(0< tengible_assets.length){
        for(var i=0; i<tengible_assets.length;i++){
            previous_price += tengible_assets[i].previous_price;
            present_price += tengible_assets[i].present_price;
        }
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((previous_price))+"</td>";
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((present_price))+"</td>";
        row +="<td class='col-sm-2 text-right'>"+getFluctuatesHtml((present_price-previous_price))+"</td>";
    }else{
        row += nodata_row;          
    }
    row += "</tr>";
    
    previous_price = 0;
    present_price = 0;
    row +="<tr>";
    row +="<td class='col-sm-4 text-left'>예금</td>";
    if(0< financial_assets.length){
        for(var i=0; i<financial_assets.length;i++){
            previous_price += financial_assets[i].previous_price;
            present_price += financial_assets[i].present_price;
        }
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((previous_price))+"</td>";
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((present_price))+"</td>";
        row +="<td class='col-sm-2 text-right'>"+getFluctuatesHtml((present_price-previous_price))+"</td>";
    }
    row += "</tr>";
    
    previous_price = 0;
    present_price = 0;
    row +="<tr>";
    row +="<td class='col-sm-4 text-left'>채무</td>";
    if(0< liability_assets.length){
        for(var i=0; i<liability_assets.length;i++){
            previous_price += liability_assets[i].previous_price;
            present_price += liability_assets[i].present_price;
        }
        
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((previous_price))+"</td>";
        row +="<td class='col-sm-3 text-left'>"+getSimpleTotalHtml((present_price))+"</td>";
        row +="<td class='col-sm-2 text-right'>"+getFluctuatesHtml((present_price-previous_price))+"</td>";
    }else{
        row += nodata_row;          
    }
    row += "</tr>";
    return row;
}


function getAssetDataHtmlByMobile(tengible_estate_assets, tengible_assets, financial_assets, liability_assets){
    var year = 2017;
    var previous_price = 0;
    var present_price = 0;
    var row = ""
    
    var previous_price_building = 0;
    var present_price_building = 0;
    var previous_price_land = 0;
    var present_price_land = 0;
    var hasBuilding = false;
    var hasLand = false;
    
    for(var i=0; i<tengible_estate_assets.length;i++){
        if(tengible_estate_assets.category == 11){
            hasBuilding = true;
            previous_price_building += tengible_estate_assets[i].previous_price;
            present_price_building += tengible_estate_assets[i].present_price;            
        }else{
            hasLand = true;
            previous_price_land += tengible_estate_assets[i].previous_price;
            present_price_land += tengible_estate_assets[i].present_price;
        }
    }
    
    var nodata_row = "<td class='col-xs-5 text-right'>-</td></tr><tr style='height:1px !important;border-bottom:1px solid rgba(255,255,255,0.5);'><td></td></tr>";
    
    row += '<tr class="title_row"><td class="col-xs-7 text-left"><div class="official_title">건물</div></td>';
    if(hasBuilding){
        row +="<td class='col-xs-5 text-right'>"+getFluctuatesHtml((present_price_building-previous_price_building))+"</td></tr>";  
        row +="<tr class='content_row'><td class='col-xs-6 text-left'>"+(year-1)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((previous_price_building))+"</td>";
        row +="<tr class='last_row'><td class='col-xs-6 text-left'>"+(year)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((present_price_building))+"</td>";
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    row += '<tr class="title_row"><td class="col-xs-7 text-left"><div class="official_title">토지</div></td>';
    if(hasBuilding){
        row +="<td class='col-xs-5 text-right'>"+getFluctuatesHtml((present_price_land-previous_price_land))+"</td></tr>";  
        row +="<tr class='content_row'><td class='col-xs-6 text-left'>"+(year-1)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((previous_price_land))+"</td>";
        row +="<tr class='last_row'><td class='col-xs-6 text-left'>"+(year)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((present_price_land))+"</td>";
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    previous_price = 0;
    present_price = 0;
    
    row += '<tr class="title_row"><td class="col-xs-7 text-left"><div class="official_title">자동차 등</div></td>';
    if(0< tengible_assets.length){
        for(var i=0; i<tengible_assets.length;i++){
            previous_price += tengible_assets[i].previous_price;
            present_price += tengible_assets[i].present_price;
        }
        
        row +="<td class='col-xs-5 text-right'>"+getFluctuatesHtml((present_price-previous_price))+"</td></tr>";  
        row +="<tr class='content_row'><td class='col-xs-6 text-left'>"+(year-1)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((previous_price))+"</td>";
        row +="<tr class='last_row'><td class='col-xs-6 text-left'>"+(year)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((present_price))+"</td>";
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    previous_price = 0;
    present_price = 0;
    
    row += '<tr class="title_row"><td class="col-xs-7 text-left"><div class="official_title">예금</div></td>';
    if(0< financial_assets.length){
        for(var i=0; i<financial_assets.length;i++){
            previous_price += financial_assets[i].previous_price;
            present_price += financial_assets[i].present_price;
        }
        
        row +="<td class='col-xs-5 text-right'>"+getFluctuatesHtml((present_price-previous_price))+"</td></tr>";  
        row +="<tr class='content_row'><td class='col-xs-6 text-left'>"+(year-1)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((previous_price))+"</td>";
        row +="<tr class='last_row'><td class='col-xs-6 text-left'>"+(year)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((present_price))+"</td>";
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    previous_price = 0;
    present_price = 0;
    
    row += '<tr class="title_row"><td class="col-xs-7 text-left"><div class="official_title">채무</div></td>';
    if(0< liability_assets.length){
        for(var i=0; i<liability_assets.length;i++){
            previous_price += liability_assets[i].previous_price;
            present_price += liability_assets[i].present_price;
        }
        
        row +="<td class='col-xs-5 text-right'>"+getFluctuatesHtml((present_price-previous_price))+"</td></tr>";  
        row +="<tr class='content_row'><td class='col-xs-6 text-left'>"+(year-1)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((previous_price))+"</td>";
        row +="<tr class='last_row'><td class='col-xs-6 text-left'>"+(year)+"</td><td class='col-xs-6 text-right'>"+getSimpleTotalHtml((present_price))+"</td>";
    }else{
        row += nodata_row;
    }
    row += "</tr>";
    
    return row;
}