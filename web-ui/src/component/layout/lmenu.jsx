import React, { Component, PropTypes } from 'react';
import { is, fromJS } from 'immutable';
import { Config } from '../mixin';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		const openKeys = Config.localItem('OPENKEY') ? [Config.localItem('OPENKEY')] : [];
		this.state = {
			openKeys: openKeys
		};
	}
    onOpenChange = (openKeys) => {
	    const state = this.state;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    Config.localItem('OPENKEY', nextOpenKeys);
	    this.setState({ openKeys: nextOpenKeys });
	}
  	getAncestorKeys = (key) => {
	    const map = {
	      sub3: ['sub2'],
	    };
	    return map[key] || [];
	}
	render() {
		const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
		return (
			<Menu openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} theme="dark" mode={this.props.mode} defaultSelectedKeys={defaultSelectedKey}>
		        <Menu.Item key="home">
			        <Link to="/home">
		              <Icon type="area-chart" />
		              {!this.props.collapsed && <span className="nav-text">实时流量</span>}
		            </Link>
	            </Menu.Item>
	            <SubMenu key="general" title={<span><Icon type="team" /><span className="nav-text">商业分析</span></span>}>
	              <Menu.Item key="button"><Link to="/general/button">用户列表</Link></Menu.Item>
	              <Menu.Item key="allDataView"><Link to="/general/allDataView">数据一览</Link></Menu.Item>
	            </SubMenu>
	            <Menu.Item key="setting">
	            <Link to="/setting">
	              <Icon type="star-o" />
	              {!this.props.collapsed && <span className="nav-text">智能决策</span>}
	            </Link>
	            </Menu.Item>
	            {/*<Menu.Item key="adver">*/}
	            {/*<Link to="/adver">*/}
	              {/*<Icon type="notification" />*/}
	              {/*{!this.props.collapsed && <span className="nav-text">广告管理</span>}*/}
	            {/*</Link>*/}
	            {/*</Menu.Item>*/}
	            <SubMenu
	              key="sub1" title={<span><Icon type="cloud" /><span className="nav-text">商场管理</span></span>}
	            >
	              <Menu.Item key="oneui"><Link to="/ui/monitorSetting">参数设置</Link></Menu.Item>
	              <Menu.Item key="twoui"><Link to="/ui/twoui">商场详情</Link></Menu.Item>
	            </SubMenu>
	        </Menu>
		)
	}
}