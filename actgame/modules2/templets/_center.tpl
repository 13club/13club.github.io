<script type="text/template" id="tpl_tab">
	<div class="cl pr main">
		<nav class="nav">
			<ul>
				<%_.each(conf.spec_show.tab,function(val,key){%>
					<li class="<%= key==0 ? \'active\' : null" %><%= val %></li>
				<%})%>
			</ul>
		</nav>
		<div class="cont pa">			
			<section>
				
			</section>
			<section class="shide">
				<ul class="rule">
					<%_.each(conf.spec_show.rule, function(data,index){%>
						<li><%=data%></li>
					<%})%>
				</ul> 
			</section>
			<section class="shide">
				<div class="fill"><span><%=conf.spec_show.top%></span><button class="state-on"><%=conf.spec_show.langtext.title[1]%></button></div class="fill">
				<div>
				<table class="rank tc">
					<thead>
						<tr>
							<%_.each(conf.spec_show.rewardhead, function(data){%>
								<td><%= data %></td>
							<%})%>
						</tr>
					</thead>
					<tbody>
						<%if(_.size(rewardlistDay)==0){%>
							<tr><td colspan="<%=conf.spec_show.rewardhead.length%>"><%= conf.spec_show.langtext.text[0] %></td></tr>
						<%}else{ %>
							<% _.each(rewardlistDay, function(data){ %>
								<tr>
									<% _.each(data, function(d){ %>
										<td><%= d %></td>
									<% }) %>
								</tr>
							<% }) %>
						<%} %>
					</tbody>
				</table>
				</div>
			</section>
		</div>
	</div>	
</script>
