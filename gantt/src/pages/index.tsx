import styles from './index.less';
import Gantt from '../gantt';

export default function IndexPage() {

  const data = [
    {
      "nodePlatform": "tom",
      "id": "p_3787673556030849024",
      "nodeName": "syncdddi_enterprise_data_package_v2.py",
      "nodeInstanceId": null,
      "avgDuration": "52秒",
      "project": "dd_assets(XXX)",
      "url": null,
      "taskrunDTOList": [
        {
          "status": "INIT",
          "duration": "4分0秒",
          "startWaitDate": 1658782920000,
          "startExecDate": 1658782920000,
          "endExecDate": 1658783160000
        }
      ]
    },
    {
      "nodePlatform": "tom",
      "id": "p_3573465257598058496",
      "nodeName": "dimXXX_ea_shop_tables_d",
      "nodeInstanceId": null,
      "avgDuration": "12秒",
      "project": "dd_assets(XXX)",
      "url": null,
      "taskrunDTOList": [
        {
          "status": "INIT",
          "duration": "5分4秒",
          "startWaitDate": 1658797200000,
          "startExecDate": 1658797200000,
          "endExecDate": 1658797504000
        }
      ]
    },
    {
      "nodePlatform": "tom",
      "id": "p_3573678528494108672",
      "nodeName": "dws_ea_tb_shop_itm_eff_1d_v2.py",
      "nodeInstanceId": "t_3573678528494108672_20220725_3865099790469497235",
      "avgDuration": "1小时36分17秒",
      "project": "dd_ea(dd)",
      "url": "",
      "taskrunDTOList": [
        {
          "status": "SUCCESS",
          "duration": "3小时25分57秒",
          "startWaitDate": 1658786401000,
          "startExecDate": 1658786401000,
          "endExecDate": 1658798758000
        }
      ]
    },
    {
      "nodePlatform": "tom",
      "id": "p_3689124638070865920",
      "nodeName": "adsXXX_ea_itm_eff_1d_range.py",
      "nodeInstanceId": "t_3689124638070865920_20220725_3865099790469497138",
      "avgDuration": "9分53秒",
      "project": "dd_assets(XXX)",
      "url": "",
      "taskrunDTOList": [
        {
          "status": "SUCCESS",
          "duration": "8分2秒",
          "startWaitDate": 1658798773000,
          "startExecDate": 1658798773000,
          "endExecDate": 1658799255000
        }
      ]
    },
    {
      "nodePlatform": "tom",
      "id": "p_3789354434431746048",
      "nodeName": "sync_adb_adsXXX_ea_itm_eff_1d_range.py",
      "nodeInstanceId": "t_3789354434431746048_20220725_3865099790469497020",
      "avgDuration": "55秒",
      "project": "dd_assets(XXX)",
      "url": null,
      "taskrunDTOList": [
        {
          "status": "SUCCESS",
          "duration": "1分26秒",
          "startWaitDate": 1658799280000,
          "startExecDate": 1658799280000,
          "endExecDate": 1658799366000
        }
      ]
    },
    {
      "nodePlatform": "tom",
      "id": "p_3762739930847707136",
      "nodeName": "adsXXX_ea_itm_eff_1d_clean.py",
      "nodeInstanceId": null,
      "avgDuration": "0秒",
      "project": "dd_assets(XXX)",
      "url": null,
      "taskrunDTOList": [
        {
          "status": "INIT",
          "duration": "0秒",
          "startWaitDate": 1658841980000,
          "startExecDate": 1658841960000,
          "endExecDate": 1658841980000
        }
      ]
    }
  ]

  return (
    <div
      style={{
        // border: '1px solid red',
        marginLeft: 100,
        overflow: 'scroll',
        padding: 20
      }}>
      <Gantt data={data} />
    </div>
  );
}
