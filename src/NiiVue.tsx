import { Niivue } from "@niivue/niivue";
import { Space, Tag, Tooltip } from "antd";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";

const { CheckableTag } = Tag;

export type Volume = {
  url: string;
  volume: { hdr: any; img: any };
  colorMap: string;
  opacity: number;
  visible: boolean;
  strokeType?: string;
};

export type NiiVueProps = {
  volumeList: Volume[];
};

export const NiiVue: React.FC<NiiVueProps> = ({ volumeList }: NiiVueProps) => {
  // 选择标签
  const [selectedTags, setSelectedTags] = useState<string[]>(
    _.compact(_.map(volumeList, "strokeType"))
  );
  // 画图ref
  const canvas = useRef();

  // 图注选择
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    if (!volumeList || volumeList.length === 0) {
      return;
    }
    // 选择要展示的volume
    let _volumeList = _.compact(
      _.map(volumeList, (volume) => {
        if (volume.strokeType) {
          if (_.includes(selectedTags, volume.strokeType)) {
            return {
              ...volume,
            };
          }
        } else {
          return volume;
        }
      })
    );
    const nv = new Niivue();
    nv.attachToCanvas(canvas.current);
    //console.log(_volumeList);
    nv.loadVolumes(_volumeList);
  }, [volumeList, selectedTags]);

  return (
    <>
      <div>
        <Space>
          {volumeList &&
            volumeList.length > 0 &&
            _.map(volumeList, (volume) => {
              if (volume.strokeType) {
                return (
                  <CheckableTag
                    style={{
                      backgroundColor: selectedTags.includes(volume.strokeType)
                        ? volume.colorMap
                        : "",
                    }}
                    key={volume.strokeType}
                    checked={selectedTags.includes(volume.strokeType)}
                    onChange={(checked) => {
                      handleChange(volume.strokeType, checked);
                    }}
                  >
                    {volume.strokeType}
                  </CheckableTag>
                );
              }
            })}
        </Space>
      </div>
      <div>
        <Tooltip title="按v键切换影像">
          <canvas ref={canvas} height={480} width={640} />
        </Tooltip>
      </div>
    </>
  );
};
